/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Element","sap/m/ObjectAttribute","sap/ui/core/util/File","sap/ui/Device","sap/base/Log","sap/base/util/ObjectPath","sap/ui/thirdparty/jquery"],function(e,t,r,i,a,s,u,l){"use strict";var o=t.extend("sap.m.UploadCollectionItem",{metadata:{library:"sap.m",properties:{contributor:{type:"string",group:"Data",defaultValue:null,deprecated:true},documentId:{type:"string",group:"Misc",defaultValue:null},fileName:{type:"string",group:"Misc",defaultValue:null},fileSize:{type:"float",group:"Misc",defaultValue:null,deprecated:true},mimeType:{type:"string",group:"Misc",defaultValue:null},thumbnailUrl:{type:"string",group:"Misc",defaultValue:null},uploadedDate:{type:"string",group:"Misc",defaultValue:null,deprecated:true},url:{type:"string",group:"Misc",defaultValue:null},enableEdit:{type:"boolean",group:"Behavior",defaultValue:true},enableDelete:{type:"boolean",group:"Behavior",defaultValue:true},visibleEdit:{type:"boolean",group:"Behavior",defaultValue:true},visibleDelete:{type:"boolean",group:"Behavior",defaultValue:true},ariaLabelForPicture:{type:"string",group:"Accessibility",defaultValue:null},selected:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,bindable:"bindable"},_propertyAttributes:{type:"sap.m.ObjectAttribute",multiple:true,visibility:"hidden"},statuses:{type:"sap.m.ObjectStatus",multiple:true,bindable:"bindable"},markers:{type:"sap.m.ObjectMarker",multiple:true,bindable:"bindable"}},associations:{fileUploader:{type:"sap.ui.unified.FileUploader",multiple:false}},events:{press:{},deletePress:{}}}});o.prototype.init=function(){this._mDeprecatedProperties={};this._aManagedInstances=[]};o.prototype.exit=function(){for(var e=0;e<this._aManagedInstances.length;e++){this._aManagedInstances[e].destroy()}};o.prototype.setContributor=function(e){if(this.getContributor()!==e){this.setProperty("contributor",e,true);this._updateDeprecatedProperties()}return this};o.prototype.setUploadedDate=function(e){if(this.getUploadedDate()!==e){this.setProperty("uploadedDate",e,true);this._updateDeprecatedProperties()}return this};o.prototype.setFileSize=function(e){if(this.getFileSize()!==e){this.setProperty("fileSize",e,true);this._updateDeprecatedProperties()}return this};o.prototype.setSelected=function(e){if(this.getSelected()!==e){this.setProperty("selected",e,true);this.fireEvent("selected")}return this};o.prototype.download=function(t){if(a.browser.name==="sf"){t=false}if(!this.getUrl()){s.warning("Items to download do not have a URL.");return false}else if(t){var r=this.getFileName();var u=this._splitFileName(r,false);var l=null;var o=new window.XMLHttpRequest;o.open("GET",this.getUrl());if(u.extension!=="csv"){o.responseType="blob"}o.onload=function(){var e=u.extension;r=u.name;l=o.response;i.save(l,r,e,this.getMimeType(),"utf-8")}.bind(this);o.send();return true}else{e.URLHelper.redirect(this.getUrl(),true);return true}};o.prototype._splitFileName=function(e,t){var r={};var i=/(?:\.([^.]+))?$/;var a=i.exec(e);r.name=e.slice(0,e.indexOf(a[0]));if(t){r.extension=a[0]}else{r.extension=a[1]}return r};o.prototype._updateDeprecatedProperties=function(){var e=["uploadedDate","contributor","fileSize"];this.removeAllAggregation("_propertyAttributes",true);l.each(e,function(e,t){var i=this.getProperty(t),a=this._mDeprecatedProperties[t];if(i){if(!a){a=new r({active:false});this._mDeprecatedProperties[t]=a;this.addAggregation("_propertyAttributes",a,true);a.setText(i)}else{a.setText(i);this.addAggregation("_propertyAttributes",a,true)}}else if(a){a.destroy();delete this._mDeprecatedProperties[t]}}.bind(this));this.invalidate()};o.prototype.getAllAttributes=function(){return this.getAggregation("_propertyAttributes",[]).concat(this.getAttributes())};o.prototype._getControl=function(e,t,r){var i=u.get(e||""),a=new i(t);this._aManagedInstances.push(a);if(r){this["_get"+r]=function(){return a}}return a};o.prototype._getPressEnabled=function(){return this.hasListeners("press")||this._hasUrl()};o.prototype._hasUrl=function(){var e=this.getUrl();return e!=null&&!!e.trim()};return o});