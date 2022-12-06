/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/fl/Layer","sap/ui/model/resource/ResourceModel","sap/ui/model/json/JSONModel"],function(e,s,n,o){"use strict";var a=e.extend("sap.ui.fl.support.apps.contentbrowser.Component",{init:function(){var a=this;e.prototype.init.apply(this,arguments);var i=new n({bundleUrl:"sap.ui.fl.support.apps.contentbrowser.i18n.i18n.properties"});this.setModel("i18n",i);var t=[];var p=new o(t);this.setModel(p,"messages");sap.ui.require(["sap/ui/fl/support/apps/contentbrowser/utils/ErrorUtils"],function(e){e.setMessagesModel(a,p)});var r={};var c=new o(r);this.setModel(c,"content");var l=[{name:"All",icon:"sap-icon://world"},{name:s.VENDOR,icon:"sap-icon://sap-logo-shape"},{name:"VENDOR_LOAD",icon:"sap-icon://share-2"},{name:s.PARTNER,icon:"sap-icon://supplier"},{name:s.CUSTOMER_BASE,icon:"sap-icon://customer-and-supplier"},{name:s.CUSTOMER,icon:"sap-icon://customer"},{name:"LOAD",icon:"sap-icon://database"},{name:s.USER,icon:"sap-icon://person-placeholder"}];var u=new o(l);this.setModel(u,"layers");this.getRouter().initialize()},metadata:{manifest:"json"}});return a});