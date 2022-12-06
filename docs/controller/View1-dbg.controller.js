sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "sap/ui/core/Fragment",
        "sap/ui/core/syncStyleClass",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/FilterType",
        "sap/ui/core/library",
        "sap/base/Log",
    ],

    function (Controller, MessageBox, Fragment, syncStyleClass, Filter, FilterOperator, FilterType, coreLib, Log) {
        "use strict";

        function SignCreate(sCertHash, sDataToSign) {
            return new Promise(function (resolve, reject) {
                cadesplugin.async_spawn(
                    function* (args) {
                        const oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
                        yield oStore.Open(
                            cadesplugin.CAPICOM_CURRENT_USER_STORE,
                            cadesplugin.CAPICOM_MY_STORE,
                            cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
                        );

                        const oStoreCerts = yield oStore.Certificates;
                        const oCertificates = yield oStoreCerts.Find(
                            cadesplugin.CAPICOM_CERTIFICATE_FIND_SHA1_HASH,
                            sCertHash
                        );
                        const nCertsCount = yield oCertificates.Count;
                        if (nCertsCount === 0) {
                            const sErr = "Certificate not found: " + sCertHash;
                            MessageBox.error(sErr);
                            args[1](sErr);
                        }
                        const oCertificate = yield oCertificates.Item(1);
                        const oSigner = yield cadesplugin.CreateObjectAsync("CAdESCOM.CPSigner");
                        yield oSigner.propset_Certificate(oCertificate);
                        yield oSigner.propset_CheckCertificate(true);
                        const oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                        yield oSignedData.propset_Content(sDataToSign);
                        let sSignedMessage = "";
                        try {
                            sSignedMessage = yield oSignedData.SignCades(oSigner, cadesplugin.CADESCOM_CADES_BES);
                        } catch (oError) {
                            const sErr = cadesplugin.getLastError(oError);
                            MessageBox.error("Failed to create signature. Error: " + sErr);
                            args[1](sErr);
                        }
                        yield oStore.Close();
                        return args[0](sSignedMessage);
                    },
                    resolve,
                    reject
                );
            });
        }

        function Verify(sSignedMessage) {
            return new Promise(function (resolve, reject) {
                cadesplugin.async_spawn(
                    function* (args) {
                        const oSignedData = yield cadesplugin.CreateObjectAsync("CAdESCOM.CadesSignedData");
                        try {
                            yield oSignedData.VerifyCades(sSignedMessage, cadesplugin.CADESCOM_CADES_BES);
                        } catch (oError) {
                            const sErr = cadesplugin.getLastError(oError);
                            MessageBox.error("Failed to verify signature. Error: " + sErr);
                            return args[1](sErr);
                        }
                        return args[0]();
                    },
                    resolve,
                    reject
                );
            });
        }

        function GetCerts() {
            return new Promise(function (resolve, reject) {
                cadesplugin.async_spawn(
                    function* (args) {
                        try {
                            const oStore = yield cadesplugin.CreateObjectAsync("CAdESCOM.Store");
                            yield oStore.Open(
                                cadesplugin.CAPICOM_CURRENT_USER_STORE,
                                cadesplugin.CAPICOM_MY_STORE,
                                cadesplugin.CAPICOM_STORE_OPEN_MAXIMUM_ALLOWED
                            );
                            const oStoreCerts = yield oStore.Certificates;
                            const nLength = yield oStoreCerts.Count;
                            const aCerts = [];
                            for (let i = 1; i <= nLength; i++) {
                                const oCert = yield oStoreCerts.Item(i);
                                aCerts.push({
                                    SubjectName: yield oCert.SubjectName,
                                    Thumbprint: yield oCert.Thumbprint,
                                    ValidToDate: new Date(yield oCert.ValidToDate),
                                });
                            }
                            args[0](aCerts);
                        } catch (oError) {
                            const sErr = cadesplugin.getLastError(oError);
                            MessageBox.error("Failed to load certificates. Error: " + sErr);
                            args[1](sErr);
                        }
                    },
                    resolve,
                    reject
                );
            });
        }

        return Controller.extend("ui5.crypto.ui5cryptotest.controller.View1", {
            onInit: function () {},

            handleFileChange: async function (oEvent) {
                function getBase64(file) {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                    });
                }
                const sBase64Data = await getBase64(oEvent.getParameter("files")[0]);
                const sCertHash = await this._askForCertificate();
                const oView = this.getView();
                oView.setBusy(true);
                let sSignedMessage;
                try {
                    sSignedMessage = await SignCreate(sCertHash, sBase64Data);
                } catch (err) {
                    Log.error(err);
                }
                oView.setBusy(false);
                oView.getModel().setProperty("/target", sSignedMessage);
            },

            _askForCertificate: async function () {
                const sCert = this.getView().getModel().getProperty("/cert");
                if (sCert) return sCert;
                const oDialog = await this._loadCertSelectDialog();
                oDialog.setBusy(true);
                oDialog.open();
                oDialog.getModel().setProperty("/certs", await GetCerts());
                oDialog.setBusy(false);
                return await new Promise((resolve, reject) => {
                    this.resolveAskForCertificatePromise = resolve;
                    this.rejectAskForCertificatePromise = reject;
                });
            },

            _loadCertSelectDialog: function () {
                const oView = this.getView();
                const oCertSelectDialog = oView.byId("CertSelectDialog");
                return oCertSelectDialog
                    ? Promise.resolve(oCertSelectDialog)
                    : Fragment.load({
                          id: oView.getId(),
                          name: "ui5.crypto.ui5cryptotest.fragment.CertSelectDialog",
                          controller: this,
                      }).then(oDialog => {
                          oView.addDependent(oDialog);
                          syncStyleClass("sapUiSizeCompact", oView, oDialog);
                          return oDialog;
                      });
            },

            onCertSearch: function (oEvent) {
                const sQuery = oEvent.getParameter("value");
                oEvent
                    .getParameter("itemsBinding")
                    .filter(
                        new Filter(
                            [
                                new Filter("SubjectName", FilterOperator.Contains, sQuery),
                                new Filter("Thumbprint", FilterOperator.Contains, sQuery),
                            ],
                            false
                        ),
                        FilterType.Application
                    );
            },

            onCertSelectDialogConfirm: function (oEvent) {
                const sThumbprint = oEvent.getParameter("selectedItem").getBindingContext().getObject("Thumbprint");
                this.getView().getModel().setProperty("/cert", sThumbprint);
                this.resolveAskForCertificatePromise(sThumbprint);
            },

            onCertSelectDialogCancel: function () {
                const sErr = "Certificate not selected";
                MessageBox.error(sErr);
                this.rejectAskForCertificatePromise(sErr);
            },

            handleVerify: async function () {
                const oView = this.getView();
                let bSuccess;
                oView.setBusy(true);
                Verify(oView.getModel().getProperty("/target"))
                    .then(
                        () => (bSuccess = true),
                        () => (bSuccess = false)
                    )
                    .finally(() => {
                        oView.setBusy(false);
                        const sState = bSuccess ? coreLib.ValueState.Success : coreLib.ValueState.Error;
                        oView.getModel().setProperty("/state", sState);
                    });
            },
        });
    }
);
