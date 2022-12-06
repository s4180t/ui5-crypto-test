sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/Device", "sap/ui/model/json/JSONModel"],
    function (UIComponent, Device, JSONModel) {
        "use strict";

        return UIComponent.extend("ui5.crypto.ui5cryptotest.Component", {
            metadata: {
                manifest: "json",
            },

            init: function () {
                UIComponent.prototype.init.apply(this, arguments);
                this.getRouter().initialize();
                this.setModel(this.createDeviceModel(), "device");
            },

            createDeviceModel: function () {
                const oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
        });
    }
);
