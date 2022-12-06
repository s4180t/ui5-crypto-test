/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/events/KeyCodes","sap/base/Log","sap/base/util/deepEqual","sap/m/library","sap/m/Button","sap/m/Dialog","sap/m/List","sap/m/MessageBox","sap/m/OverflowToolbar","sap/m/StandardListItem","sap/m/Text","sap/m/ToolbarSpacer","sap/ui/unified/FileUploader","sap/m/upload/UploadSetItem","sap/m/upload/Uploader","sap/m/upload/UploadSetRenderer","sap/m/upload/UploaderHttpRequestMethod","sap/ui/core/dnd/DragDropInfo","sap/ui/core/dnd/DropInfo","sap/m/library","sap/m/upload/UploadSetToolbarPlaceholder","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","sap/m/IllustratedMessageSize","sap/ui/core/Core"],function(e,t,i,o,r,s,a,l,n,d,p,h,u,m,g,f,c,_,I,y,T,D,U,E,b,v){"use strict";var S=e.extend("sap.m.upload.UploadSet",{metadata:{library:"sap.m",properties:{fileTypes:{type:"string[]",defaultValue:null},maxFileNameLength:{type:"int",defaultValue:null},maxFileSize:{type:"float",defaultValue:null},mediaTypes:{type:"string[]",defaultValue:null},noDataText:{type:"string",defaultValue:null},noDataDescription:{type:"string",defaultValue:null},dragDropText:{type:"string",defaultValue:null},dragDropDescription:{type:"string",defaultValue:null},instantUpload:{type:"boolean",defaultValue:true},showIcons:{type:"boolean",defaultValue:true},terminationEnabled:{type:"boolean",defaultValue:true},uploadEnabled:{type:"boolean",defaultValue:true},uploadUrl:{type:"string",defaultValue:null},uploadButtonInvisible:{type:"boolean",group:"Appearance",defaultValue:false},sameFilenameAllowed:{type:"boolean",group:"Behavior",defaultValue:false},httpRequestMethod:{type:"sap.m.upload.UploaderHttpRequestMethod",defaultValue:_.Post},multiple:{type:"boolean",group:"Behavior",defaultValue:false},mode:{type:"sap.m.ListMode",group:"Behavior",defaultValue:T.ListMode.MultiSelect},cloudFilePickerEnabled:{type:"boolean",group:"Behavior",defaultValue:false},cloudFilePickerServiceUrl:{type:"sap.ui.core.URI",group:"Data",defaultValue:""},cloudFilePickerButtonText:{type:"string",defaultValue:""},directory:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"item"},incompleteItems:{type:"sap.m.upload.UploadSetItem",multiple:true,singularName:"incompleteItem"},headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"},toolbar:{type:"sap.m.OverflowToolbar",multiple:false},uploader:{type:"sap.m.upload.Uploader",multiple:false},_illustratedMessage:{type:"sap.m.IllustratedMessage",multiple:false,visibility:"hidden"}},events:{afterItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileRenamed:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},afterItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},beforeItemAdded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemRemoved:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeItemEdited:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},beforeUploadStarts:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadCompleted:{parameters:{item:{type:"sap.m.upload.UploadSetItem"},response:{type:"string"},readyState:{type:"string"},status:{type:"string"},responseXML:{type:"string"},headers:{type:"object"}}},beforeUploadTermination:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}},allowPreventDefault:true},uploadTerminated:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileNameLengthExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},fileSizeExceeded:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},mediaTypeMismatch:{parameters:{item:{type:"sap.m.upload.UploadSetItem"}}},selectionChanged:{parameters:{items:{type:"sap.m.upload.UploadSetItem[]"}}},itemDragStart:{},itemDrop:{}}},renderer:c});var F=r.UploadState;S.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=null;this._oEditedItem=null;this._oItemToBeDeleted=null;this._mListItemIdToItemMap={};this._oUploadButton=null;this._oDragIndicator=false;this._bAttachEventListener=false;this._$Body=null;this._$DragDropArea=null;this._oLastEnteredTarget=null;this._aGroupHeadersAdded=[];this._iFileUploaderPH=null;this._oItemToUpdate=null;var e=new U({illustrationType:E.NoData,illustrationSize:b.Auto,title:this.getNoDataText(),description:this.getNoDataDescription()});this.setAggregation("_illustratedMessage",e);e.addIllustrationAriaLabelledBy(e.getId());this._cloudFilePickerControl=null};S.prototype.exit=function(){if(this._oList){this._oList.destroy();this._oList=null}if(this._oToolbar){this._oToolbar.destroy();this._oToolbar=null}if(this._oFileUploader){this._oFileUploader.destroy();this._oFileUploader=null}if(this._oUploader){this._oUploader.destroy();this._oUploader=null}};S.prototype.onBeforeRendering=function(e){this._aGroupHeadersAdded=[];this._clearGroupHeaders();this._fillListWithUploadSetItems(this.getItems())};S.prototype.onAfterRendering=function(){var e;if(this._oEditedItem){e=this._oEditedItem._getFileNameEdit().$("inner");if(e){e.on("focus",function(){e.selectText(0,e.val().length)});e.trigger("focus")}if(this._oEditedItem&&this._oEditedItem.getEditState()){var t=this._oEditedItem.getListItem().getDomRef().querySelector(".sapMUSObjectMarkerContainer");if(t){t.setAttribute("style","display: none")}}}};S.prototype.onkeydown=function(e){var i,o;if(this._oEditedItem&&this._oEditedItem._getFileNameEdit().$("inner")[0]===e.target){o=this._oEditedItem}else if(e.target){i=sap.ui.getCore().byId(e.target.id);if(i){o=this._mListItemIdToItemMap[i.getId()]}}if(!o){return}switch(e.keyCode){case t.F2:if(o._bInEditMode){this._handleItemEditConfirmation(e,o)}else{this._handleItemEdit(e,o)}break;case t.ESCAPE:this._handleItemEditCancelation(e,o);break;case t.DELETE:if(!o.$("fileNameEdit").hasClass("sapMInputFocused")){this._handleItemDelete(e,o)}break;case t.ENTER:if(o===this._oEditedItem){this._handleItemEditConfirmation(e,o)}else{o._handleFileNamePressed()}break;default:return}};S.prototype.getToolbar=function(){if(!this._oToolbar){this._oToolbar=this.getAggregation("toolbar");if(!this._oToolbar){this._oToolbar=new d(this.getId()+"-toolbar",{content:[this._oNumberOfAttachmentsTitle,new u,this.getDefaultFileUploader(),this._getCloudFilePicker()]});this._iFileUploaderPH=2;this.addDependent(this._oToolbar)}else{this._iFileUploaderPH=this._getFileUploaderPlaceHolderPosition(this._oToolbar);if(this._oToolbar&&this._iFileUploaderPH>-1){this._setFileUploaderInToolbar(this.getDefaultFileUploader())}else if(this._oToolbar){this._oToolbar.addContent(this.getDefaultFileUploader())}this._oToolbar.addContent(this._getCloudFilePicker())}}return this._oToolbar};S.prototype._setListNoDataText=function(e,t){var i="";var o=this.getAggregation("_illustratedMessage");if(!e){i=o.getTitle()+" "+o.getDescription()}else if(e){if(t){i=o.getTitle()+" "+e}else{i=e+" "+o.getDescription()}}return i};S.prototype.getNoDataText=function(){var e=this.getProperty("noDataText");e=e||this._oRb.getText("UPLOAD_SET_NO_DATA_TEXT");if(this._oList){this._oList.setNoDataText(this._setListNoDataText(e))}return e};S.prototype.getNoDataDescription=function(){var e=this.getProperty("noDataDescription");e=e||this._oRb.getText("UPLOADCOLLECTION_NO_DATA_DESCRIPTION");if(this._oList){this._oList.setNoDataText(this._setListNoDataText(e,true))}return e};S.prototype.getDragDropText=function(){var e=this.getProperty("dragDropText");e=e||this._oRb.getText("IllustratedMessage_TITLE_UploadCollection");return e};S.prototype.getDragDropDescription=function(){var e=this.getProperty("dragDropDescription");e=e||this._oRb.getText("IllustratedMessage_DESCRIPTION_UploadCollection");return e};S.prototype.setToolbar=function(e){this.setAggregation("toolbar",e);this.getToolbar();return this};S.prototype.addAggregation=function(t,i,o){e.prototype.addAggregation.call(this,t,i,o);if(i&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(i);this._refreshInnerListStyle()}};S.prototype.insertAggregation=function(t,i,o,r){e.prototype.insertAggregation.call(this,t,i,o,r);if(i&&(t==="items"||t==="incompleteItems")){this._projectToNewListItem(i,o||0);this._refreshInnerListStyle()}};S.prototype.removeAggregation=function(t,i,o){var r,s;e.prototype.removeAggregation.call(this,t,i,o);if(t==="items"||t==="incompleteItems"){if(typeof i==="number"){s=this.getItems();r=s[i]}else if(typeof i==="object"){if(this.getList()&&this.getList().getItems().length){r=i._getListItem()}}var a=this.getList().removeAggregation("items",r,o);if(a&&i){a.destroy();i.destroy()}this._refreshInnerListStyle()}};S.prototype.setFileTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!o(this.getFileTypes(),t)){this.setProperty("fileTypes",t,true);this._checkRestrictions()}return this};S.prototype.setMaxFileNameLength=function(e){if(this.getMaxFileNameLength()!==e){this.setProperty("maxFileNameLength",e,true);this._checkRestrictions()}return this};S.prototype.setMaxFileSize=function(e){if(this.getMaxFileSize()!==e){this.setProperty("maxFileSize",e,true);this._checkRestrictions()}return this};S.prototype.setMediaTypes=function(e){var t=e||null;if(typeof t==="string"){t=t.split(",")}t=(t||[]).map(function(e){return e?e.toLowerCase():""});if(!o(this.getMediaTypes(),t)){this.setProperty("mediaTypes",t,true);this._checkRestrictions()}return this};S.prototype.setShowIcons=function(e){if(e!==this.getShowIcons()){this._getAllItems().forEach(function(t){t._getIcon().setVisible(e)});this.setProperty("showIcons",e,false)}return this};S.prototype.setTerminationEnabled=function(e){if(e!==this.getTerminationEnabled()){this._getAllItems().forEach(function(t){if(t.getUploadState()===F.Uploading){t._getTerminateButton().setVisible(e)}});this.setProperty("terminationEnabled",e,false)}return this};S.prototype.setUploadButtonInvisible=function(e){if(this.getUploadButtonInvisible()===e){return this}this.setProperty("uploadButtonInvisible",e,true);this.getDefaultFileUploader().setVisible(!e);return this};S.prototype.setUploadEnabled=function(e){if(e!==this.getUploadEnabled()){this.getDefaultFileUploader().setEnabled(e);this.setProperty("uploadEnabled",e,false)}return this};S.prototype.setMultiple=function(e){if(this.getMultiple()!==e){this.setProperty("multiple",e);this.getDefaultFileUploader().setMultiple(e)}return this};S.prototype.setDirectory=function(e){if(this.getDirectory()!==e){this.setProperty("directory",e);this.getDefaultFileUploader().setDirectory(e);if(e){this.setProperty("multiple",false)}}return this};S.prototype.setMode=function(e){if(e===T.ListMode.Delete){this.setProperty("mode",T.ListMode.None);i.info("sap.m.ListMode.Delete is not supported by UploadSet. Value has been resetted to 'None'")}else if(e===T.ListMode.MultiSelect&&!this.getInstantUpload()){this.setProperty("mode",T.ListMode.None);i.info("sap.m.ListMode.MultiSelect is not supported by UploadSet for Pending Upload. Value has been reset to 'None'")}else{this.setProperty("mode",e)}if(this._oList){this._oList.setMode(this.getMode())}return this};S.prototype._getIllustratedMessage=function(){var e=this.getAggregation("_illustratedMessage");if(e){if(this._getDragIndicator()){e.setIllustrationType(E.UploadCollection);e.setTitle(this.getDragDropText());e.setDescription(this.getDragDropDescription());e.removeAllAdditionalContent()}else{e.setIllustrationType(E.NoData);e.setTitle(this.getNoDataText());e.setDescription(this.getNoDataDescription());e.addAdditionalContent(this.getUploadButtonForIllustratedMessage())}}return e};S.prototype.getUploadButtonForIllustratedMessage=function(){if(!this._oUploadButton){this._oUploadButton=new s({id:this.getId()+"-uploadButton",type:r.ButtonType.Standard,visible:this.getUploadEnabled(),text:this._oRb.getText("UPLOADCOLLECTION_UPLOAD"),ariaDescribedBy:this.getAggregation("_illustratedMessage").getId(),press:function(){var e=this.getDefaultFileUploader();e.$().find("input[type=file]").trigger("click")}.bind(this)})}return this._oUploadButton};S.prototype.setUploadUrl=function(e){this.setProperty("uploadUrl",e);if(this._oUploader){this._oUploader.setUploadUrl(e)}return this};S.prototype.getList=function(){if(!this._oList){this._oList=new l(this.getId()+"-list",{selectionChange:[this._handleSelectionChange,this],headerToolbar:this.getToolbar(),dragDropConfig:[new I({dropPosition:"Between",sourceAggregation:"items",targetAggregation:"items",dragStart:[this._onDragStartItem,this],drop:[this._onDropItem,this]}),new y({dropEffect:"Move",dropPosition:"OnOrBetween",dragEnter:[this._onDragEnterFile,this],drop:[this._onDropFile,this]})],mode:this.getMode(),noDataText:this._setListNoDataText()});this._oList.addStyleClass("sapMUCList");this.addDependent(this._oList)}return this._oList};S.prototype._onDragStartItem=function(e){this.fireItemDragStart(e)};S.prototype._onDropItem=function(e){this.fireItemDrop(e)};S.prototype._onDragEnterFile=function(e){var t=e.getParameter("dragSession");var i=t.getDragControl();if(!this._bAttachEventListener){window.addEventListener("focus",function(){this._oDragIndicator=false;this._getIllustratedMessage()}.bind(this),true);this._bAttachEventListener=true}this._oDragIndicator=true;this._getIllustratedMessage();if(i){e.preventDefault()}};S.prototype._onDropFile=function(e){this._oDragIndicator=false;this._getIllustratedMessage();e.preventDefault();if(this.getUploadEnabled()){var t=e.getParameter("browserEvent").dataTransfer.items;t=Array.from(t);t=t.filter(function(e){return e.webkitGetAsEntry()?true:false});var o=t.map(function(e){var t=e.webkitGetAsEntry();return{entryType:t&&t.isFile?"File":"Directory"}});if(t&&t.length>1&&!this.getMultiple()&&!this.getDirectory()){var r=this._oRb.getText("UPLOADCOLLECTION_MULTIPLE_FALSE");i.warning("Multiple files upload is retsricted for this multiple property set");n.error(r);return}else if(t&&t.length>1&&this.getMultiple()&&!d("File",o)){var s=this._oRb.getText("UPLOAD_SET_DIRECTORY_FALSE");i.warning("Multiple files upload is retsricted, drag & drop only files");n.error(s);return}if(t&&!this.getDirectory()&&d("Directory",o)){var a=this._oRb.getText("UPLOAD_SET_DIRECTORY_FALSE");i.warning("Directory of files upload is retsricted for this directory property set");n.error(a);return}else if(t&&this.getDirectory()&&!d("Directory",o)){var l=this._oRb.getText("UPLOAD_SET_DROP_DIRECTORY");i.warning("Directory of files upload is retsricted, drag & drop only directories here.");n.error(l);return}if(t&&t.length){this._getFilesFromDataTransferItems(t).then(function(e){if(e&&e.length){var t=this.getDefaultFileUploader();if(t&&t._areFilesAllowed&&t._areFilesAllowed(e)){this._processNewFileObjects(e)}}}.bind(this))}}function d(e,t){return t.every(function(t){return t.entryType===e})}};S.prototype._getFilesFromDataTransferItems=function(e){var t=[];return new Promise(function(o,r){var s=[];for(var a=0;a<e.length;a++){s.push(i(e[a].webkitGetAsEntry()))}Promise.all(s).then(function(e){o(t)},function(e){r(e)})});function i(e){return new Promise(function(o,r){if(e.isFile){e.file(function(e){t.push(e);o(e)},function(e){r(e)})}else if(e.isDirectory){var s=e.createReader();s.readEntries(function(e){var t=[];for(var r=0;r<e.length;r++){t.push(i(e[r]))}o(Promise.all(t))})}})}};S.prototype._getDragIndicator=function(){return this._oDragIndicator};S.prototype.upload=function(){if(!this.getUploadEnabled()){i.warning("Upload is currently disabled for this upload set.");return}this.getIncompleteItems().forEach(function(e){this._uploadItemIfGoodToGo(e)}.bind(this))};S.prototype.uploadItem=function(e){this._uploadItemIfGoodToGo(e)};S.prototype.getDefaultFileUploader=function(){var e=this._oRb.getText("UPLOADCOLLECTION_UPLOAD");if(!this._oFileUploader){this._oFileUploader=new m(this.getId()+"-uploader",{buttonOnly:true,buttonText:e,tooltip:e,iconOnly:false,enabled:this.getUploadEnabled(),fileType:this.getFileTypes(),mimeType:this.getMediaTypes(),icon:"",iconFirst:false,multiple:this.getDirectory()?false:this.getMultiple(),style:"Transparent",name:"uploadSetFileUploader",sameFilenameAllowed:true,useMultipart:false,sendXHR:true,change:[this._onFileUploaderChange,this],uploadStart:[this._onUploadStarted,this],uploadProgress:[this._onUploadProgressed,this],uploadComplete:[this._onUploadCompleted,this],uploadAborted:[this._onUploadAborted,this],typeMissmatch:[this._fireFileTypeMismatch,this],fileSizeExceed:[this._fireFileSizeExceed,this],filenameLengthExceed:[this._fireFilenameLengthExceed,this],visible:!this.getUploadButtonInvisible(),directory:this.getDirectory()})}return this._oFileUploader};S.prototype.registerUploaderEvents=function(e){e.attachUploadStarted(this._onUploadStarted.bind(this));e.attachUploadProgressed(this._onUploadProgressed.bind(this));e.attachUploadCompleted(this._onUploadCompleted.bind(this));e.attachUploadAborted(this._onUploadAborted.bind(this))};S.prototype.getSelectedItems=function(){var e=this._oList.getSelectedItems();return this._getUploadSetItemsByListItems(e)};S.prototype.getSelectedItem=function(){var e=this._oList.getSelectedItem();if(e){return this._getUploadSetItemsByListItems([e])}return null};S.prototype.setSelectedItemById=function(e,t){this._oList.setSelectedItemById(e+"-listItem",t);this._setSelectedForItems([this._getUploadSetItemById(e)],t);return this};S.prototype.setSelectedItem=function(e,t){return this.setSelectedItemById(e.getId(),t)};S.prototype.selectAll=function(){var e=this._oList.selectAll();if(e.getItems().length!==this.getItems().length){i.info("Internal 'List' and external 'UploadSet' are not in sync.")}this._setSelectedForItems(this.getItems(),true);return this};S.prototype.openFileDialog=function(e){if(this._oFileUploader){if(e){if(!this._oFileUploader.getMultiple()){this._oItemToUpdate=e;this._oFileUploader.$().find("input[type=file]").trigger("click")}else{i.warning("Version Upload cannot be used in multiple upload mode")}}else{this._oFileUploader.$().find("input[type=file]").trigger("click")}}return this};S.prototype._onFileUploaderChange=function(e){var t=e.getParameter("files");this._processNewFileObjects(t)};S.prototype._onUploadStarted=function(e){var t=e.getParameter("item");t.setUploadState(F.Uploading)};S.prototype._onUploadProgressed=function(e){var t=e.getParameter("item"),i=Math.round(e.getParameter("loaded")/e.getParameter("total")*100);t.setProgress(i)};S.prototype._onUploadCompleted=function(e){var t=e.getParameter("item"),i=e.getParameter("responseXHR"),o=null;if(i.responseXML){o=i.responseXML.documentElement.textContent}var r={item:t,response:i.response,responseXML:o,readyState:i.readyState,status:i.status,headers:i.headers};t.setProgress(100);if(this._oItemToUpdate&&this.getInstantUpload()){this.removeAggregation("items",this._oItemToUpdate,false)}this.insertItem(t,0);t.setUploadState(F.Complete);this._oItemToUpdate=null;this.fireUploadCompleted(r)};S.prototype._onUploadAborted=function(e){var t=e.getParameter("item");t.setUploadState(F.Error);this.fireUploadTerminated({item:t})};S.prototype._handleItemEdit=function(e,t){if(this._oEditedItem){this._oEditedItem=g._findById(this._oEditedItem.getId(),this._getAllItems());this._handleItemEditConfirmation(e,this._oEditedItem)}if(!this._oEditedItem){if(this.fireBeforeItemEdited({item:t})){this._oEditedItem=g._findById(t.getId(),this._getAllItems());this._oEditedItem._setInEditMode(true)}}};S.prototype._handleItemRestart=function(e,t){t.setUploadState(F.Ready);this._uploadItemIfGoodToGo(t)};S.prototype._handleItemEditConfirmation=function(e,t){var i=t._getFileNameEdit(),o,r,s=t.getFileName(),a=g._splitFileName(s),l=g._findById(t.getId(),this._getAllItems());if(i!==null){o=i.getValue().trim()}i.focus();if(!o||o.length===0){t._setContainsError(true);return}if(a.name===o){this._removeErrorStateFromItem(this,l);t._setInEditMode(false);this.fireAfterItemEdited({item:t});this._oEditedItem=null;return}if(!this.getSameFilenameAllowed()&&g._checkDoubleFileName(i.getValue()+"."+a.extension,this._getAllItems())){i.setValueStateText(this._oRb.getText("UPLOAD_SET_FILE_NAME_EXISTS"));i.setProperty("valueState","Error",true);i.setShowValueStateMessage(true)}else{r=a.extension?o+"."+a.extension:o;t.setFileName(r);this._removeErrorStateFromItem(this,l);t._setInEditMode(false);this.fireFileRenamed({item:t})}this._oEditedItem=null;this.invalidate()};S.prototype._removeErrorStateFromItem=function(e,t){t.errorState=null;e.sErrorState=null;e.editModeItem=null};S.prototype._handleItemEditCancelation=function(e,t){t._setContainsError(false);t._setInEditMode(false);this._oEditedItem=null};S.prototype._handleItemDelete=function(e,t){var i;if(this._oEditedItem){this._oEditedItem=g._findById(this._oEditedItem.getId(),this._getAllItems());this._handleItemEditConfirmation(e,this._oEditedItem);if(this._oEditedItem){return}}if(!t.fireRemovePressed({item:t})){return}if(!this.fireBeforeItemRemoved({item:t})){return}if(!t.getFileName()){i=this._oRb.getText("UPLOAD_SET_DELETE_WITHOUT_FILE_NAME_TEXT")}else{i=this._oRb.getText("UPLOAD_SET_DELETE_TEXT",t.getFileName())}this._oItemToBeDeleted=g._findById(t.getId(),this._getAllItems());n.show(i,{id:this.getId()+"-deleteDialog",title:this._oRb.getText("UPLOAD_SET_DELETE_TITLE"),actions:[n.Action.OK,n.Action.CANCEL],onClose:this._handleClosedDeleteDialog.bind(this),dialogId:"messageBoxDeleteFile",styleClass:this.hasStyleClass("sapUiSizeCompact")?"sapUiSizeCompact":""})};S.prototype._handleClosedDeleteDialog=function(e){if(e!==n.Action.OK){return}this.removeItem(this._oItemToBeDeleted);this.removeIncompleteItem(this._oItemToBeDeleted);this.fireAfterItemRemoved({item:this._oItemToBeDeleted});this._oItemToBeDeleted=null};S.prototype._handleTerminateRequest=function(e,t){var i=new l({items:[new p({title:t.getFileName(),icon:t._getIcon().getSrc()})]}),o=new a({id:this.getId()+"-teminateDialog",title:this._oRb.getText("UPLOAD_SET_TERMINATE_TITLE"),content:[new h({text:this._oRb.getText("UPLOAD_SET_TERMINATE_TEXT")}),i],buttons:[new s({text:this._oRb.getText("UPLOAD_SET_OKBUTTON_TEXT"),press:[r,this]}),new s({text:this._oRb.getText("UPLOAD_SET_CANCEL_BUTTON_TEXT"),press:function(){o.close()}})],afterClose:function(){o.destroy()}});o.open();function r(){if(t.getUploadState()===F.Uploading){if(this.fireBeforeUploadTermination({item:t})){this._handleUploadTermination(t)}}else if(t.getUploadState()===F.Complete){this.removeItem(t)}o.close();this.invalidate()}};S.prototype._handleUploadTermination=function(e){this._getActiveUploader().terminateItem(e)};S.prototype._handleSelectionChange=function(e){var t=e.getParameter("listItems"),i=[];t.forEach(function(e){i.push(this._mListItemIdToItemMap[e.getId()])}.bind(this));this.fireSelectionChanged({items:i})};S.prototype._onDragEnterSet=function(e){if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDropIndicator")}};S.prototype._onDragLeaveSet=function(e){if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator")}};S.prototype._onDragOverSet=function(e){e.preventDefault()};S.prototype._onDropOnSet=function(e){var t;e.preventDefault();if(e.target===this._$DragDropArea[0]&&this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDropIndicator");this._$DragDropArea.addClass("sapMUCDragDropOverlayHide");t=e.originalEvent.dataTransfer.files;this._processNewFileObjects(t)}};S.prototype._onDragEnterBody=function(e){if(this.getUploadEnabled()){this._oLastEnteredTarget=e.target;this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")}};S.prototype._onDragLeaveBody=function(e){if(this._oLastEnteredTarget===e.target&&this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};S.prototype._onDragOverBody=function(e){e.preventDefault();if(this.getUploadEnabled()){this._$DragDropArea.removeClass("sapMUCDragDropOverlayHide")}};S.prototype._onDropOnBody=function(e){if(this.getUploadEnabled()){this._$DragDropArea.addClass("sapMUCDragDropOverlayHide")}};S.prototype._getAllItems=function(){return this.getItems().concat(this.getIncompleteItems())};S.prototype._refreshInnerListStyle=function(){var e=this.getList().length-1;this._oList.getItems().forEach(function(t,i){t.removeStyleClass("sapMUCListSingleItem").removeStyleClass("sapMUCListFirstItem").removeStyleClass("sapMUCListLastItem").removeStyleClass("sapMUCListItem");if(i===0&&e===0){t.addStyleClass("sapMUCListSingleItem")}else if(i===0){t.addStyleClass("sapMUCListFirstItem")}else if(i===e){t.addStyleClass("sapMUCListLastItem")}else{t.addStyleClass("sapMUCListItem")}})};S.prototype._processNewFileObjects=function(e){var t=[],i;for(var o=0;o<e.length;o++){t.push(e[o])}t.forEach(function(e){i=new g({uploadState:F.Ready});i._setFileObject(e);i.setFileName(e.name);if(!this.fireBeforeItemAdded({item:i})){return}this.insertIncompleteItem(i);this.fireAfterItemAdded({item:i});if(this.getInstantUpload()){this._uploadItemIfGoodToGo(i)}}.bind(this))};S.prototype._projectToNewListItem=function(e,t){var i=e._getListItem();this._mListItemIdToItemMap[i.getId()]=e;if(e.sParentAggregationName==="items"){this._mapGroupForItem(e)}if(t===0){this.getList().insertAggregation("items",i,t,true)}else{this.getList().addAggregation("items",i,true)}this._checkRestrictionsForItem(e)};S.prototype._getImplicitUploader=function(){if(!this._oUploader){this._oUploader=new f({httpRequestMethod:this.getHttpRequestMethod()});this._oUploader.setUploadUrl(this.getUploadUrl());this.registerUploaderEvents(this._oUploader);this.addDependent(this._oUploader)}return this._oUploader};S.prototype._getActiveUploader=function(){return this.getUploader()||this._getImplicitUploader()};S.prototype._uploadItemIfGoodToGo=function(e){if(e.getUploadState()===F.Ready&&!e._isRestricted()){if(this.fireBeforeUploadStarts({item:e})){var t=e.getHeaderFields().length?e.getHeaderFields():this.getHeaderFields();this._getActiveUploader().uploadItem(e,t)}}};S.prototype._getDragDropHandlers=function(){if(!this._oDragDropHandlers){this._oDragDropHandlers={body:{dragenter:this._onDragEnterBody.bind(this),dragleave:this._onDragLeaveBody.bind(this),dragover:this._onDragOverBody.bind(this),drop:this._onDropOnBody.bind(this)},set:{dragenter:this._onDragEnterSet.bind(this),dragleave:this._onDragLeaveSet.bind(this),dragover:this._onDragOverSet.bind(this),drop:this._onDropOnSet.bind(this)}}}return this._oDragDropHandlers};S.prototype._checkRestrictions=function(){this.getIncompleteItems().forEach(function(e){this._checkRestrictionsForItem(e)}.bind(this))};S.prototype._checkRestrictionsForItem=function(e){e._checkTypeRestriction(this.getFileTypes());e._checkNameLengthRestriction(this.getMaxFileNameLength());e._checkSizeRestriction(this.getMaxFileSize());e._checkMediaTypeRestriction(this.getMediaTypes())};S.prototype._fireFileTypeMismatch=function(e){var t=this.getMediaTypes();var i=this.getFileTypes();var o=e.getParameter("fileType");var r=e.getParameter("mimeType");var s=!!t&&t.length>0&&!!r&&t.indexOf(r)===-1;var a=!!i&&i.length>0&&!!o&&i.indexOf(o)===-1;var l=[new Blob([])];var n={type:e.getParameter("fileType"),webkitRelativePath:"",name:e.getParameter("fileName")};var d=new File(l,e.getParameter("fileName"),n);var p=new g;p._setFileObject(d);p.setFileName(d.name);if(s){this.fireMediaTypeMismatch({item:p})}else if(a){this.fireFileTypeMismatch({item:p})}};S.prototype._fireFileSizeExceed=function(e){this.fireFileSizeExceeded({item:e})};S.prototype._fireFilenameLengthExceed=function(e){this.fireFileNameLengthExceeded({item:e})};S.prototype._setSelectedForItems=function(e,t){if(this.getMode()!==T.ListMode.MultiSelect&&t){var i=this.getItems();for(var o=0;o<i.length;o++){i[o].setSelected(false)}}for(var r=0;r<e.length;r++){e[r].setSelected(t)}};S.prototype._getUploadSetItemById=function(e){var t=this.getItems();for(var i=0;i<t.length;i++){if(t[i].getId()===e){return t[i]}}return null};S.prototype._getUploadSetItemsByListItems=function(e){var t=[];var i=this.getItems();if(e){for(var o=0;o<e.length;o++){for(var r=0;r<i.length;r++){if(e[o].getId()===i[r].getId()+"-listItem"){t.push(i[r]);break}}}return t}return null};S.prototype._clearGroupHeaders=function(){this.getList().getItems().forEach(function(e){if(e.isGroupHeader()){e.destroy(false)}})};S.prototype._mapGroupForItem=function(e){var t=this.getBinding("items"),i=this.getBindingInfo("items")?this.getBindingInfo("items").model:undefined,o=this.getBindingInfo("items")?this.getBindingInfo("items").groupHeaderFactory:null;var r=function(e){return e.getBindingContext(i)?t.getGroup(e.getBindingContext(i)):null};var s=function(e){return r(e)&&r(e).key};if(t&&t.isGrouped()&&e){if(!this._aGroupHeadersAdded.some(function(t){return t===s(e)})){if(o){this.getList().addItemGroup(r(e),o(r(e)),true)}else if(r(e)){this.getList().addItemGroup(r(e),null,true)}this._aGroupHeadersAdded.push(s(e))}}};S.prototype._fillListWithUploadSetItems=function(e){var t=this;e.forEach(function(e,i){e._reset();t._projectToNewListItem(e,true);t._refreshInnerListStyle()})};S.prototype._getFileUploaderPlaceHolderPosition=function(e){for(var t=0;t<e.getContent().length;t++){if(e.getContent()[t]instanceof D){return t}}return-1};S.prototype._setFileUploaderInToolbar=function(e){this._oToolbar.getContent()[this._iFileUploaderPH].setVisible(false);this._oToolbar.insertContent(e,this._iFileUploaderPH)};S.prototype._getCloudFilePicker=function(){if(this.getCloudFilePickerEnabled()){return new s({text:this.getCloudFilePickerButtonText()?this.getCloudFilePickerButtonText():this._oRb.getText("UPLOAD_SET_DEFAULT_CFP_BUTTON_TEXT"),press:[this._invokeCloudFilePicker,this]})}return null};S.prototype._invokeCloudFilePicker=function(){var e=null;if(this._cloudFilePickerControl){e=this._getCloudFilePickerInstance();e.open()}else{this._loadCloudFilePickerDependency().then(function(t){this._cloudFilePickerControl=t;e=this._getCloudFilePickerInstance();e.open()}.bind(this)).catch(function(e){i.error(e)})}return e};S.prototype._onCloudPickerFileChange=function(e){var t=e.getParameters();var i=[];if(t&&t.selectedFiles){t.selectedFiles.forEach(function(e){i.push(this._createFileFromCloudPickerFile(e))}.bind(this))}this._processNewCloudPickerFileObjects(i)};S.prototype._createFileFromCloudPickerFile=function(e){var t=[new Blob([])];var i={type:e.getFileShareItemContentType(),size:e.getFileShareItemContentSize(),webkitRelativePath:"",name:e.getFileShareItemName()};var o=new File(t,e.getFileShareItemName(),i);return{file:o,fileShareProperties:e.mProperties}};S.prototype._mapFileShareItemToUploadSetItem=function(e,t){e.setFileName(t.fileShareItemName);e.setUrl(t.fileShareItemContentLink)};S.prototype._processNewCloudPickerFileObjects=function(e){var t;e.forEach(function(e){var i=e.file,o=e.fileShareProperties;t=new g({uploadState:F.Ready});if(o&&o!==null){this._mapFileShareItemToUploadSetItem(t,o)}t._setFileObject(i);t.setFileName(i.name);if(!this.fireBeforeItemAdded({item:t})){return}this.insertIncompleteItem(t);this.fireAfterItemAdded({item:t});if(this.getInstantUpload()){this._uploadItemIfGoodToGo(t)}}.bind(this))};S.prototype._loadCloudFilePickerDependency=function(){return new Promise(function(e,t){v.loadLibrary("sap.suite.ui.commons",{async:true}).then(function(){sap.ui.require(["sap/suite/ui/commons/CloudFilePicker"],function(t){e(t)},function(e){t(e)})}).catch(function(){t("CloudFilePicker Control not available.")})})};S.prototype._getCloudFilePickerInstance=function(){return new this._cloudFilePickerControl({serviceUrl:this.getCloudFilePickerServiceUrl(),confirmButtonText:this._oRb.getText("SELECT_PICKER_TITLE_TEXT"),title:this._oRb.getText("SELECT_PICKER_TITLE_TEXT"),fileNameMandatory:true,enableDuplicateCheck:this.getSameFilenameAllowed(),select:this._onCloudPickerFileChange.bind(this)})};return S});