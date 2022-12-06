/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/table/columnmenu/Entry"],function(t){"use strict";var e=t.extend("sap.m.table.columnmenu.ItemBase",{metadata:{abstract:true,library:"sap.m"}});e.prototype.init=function(){this._oButtonSettings={reset:{visible:true,enabled:true},confirm:{visible:true,enabled:true},cancel:{visible:true,enabled:true}}};e.prototype.getEffectiveItems=function(){return this.getVisible()?[this]:[]};e.prototype.getIcon=function(){if(this.getMetadata().hasProperty("icon")){return this.getProperty("icon")}throw new Error(this+" does not implement #getIcon")};e.prototype.onPress=function(t){};e.prototype.onBack=function(t){};e.prototype.onConfirm=function(t){};e.prototype.onCancel=function(t){};e.prototype.onReset=function(t){};e.prototype.getButtonSettings=function(){return this._oButtonSettings};e.prototype.changeButtonSettings=function(t){Object.keys(t).forEach(function(e){if(this._oButtonSettings.hasOwnProperty(e)){Object.keys(t[e]).forEach(function(n){this._oButtonSettings[e][n]=t[e][n]},this)}},this);this.getMenu()&&this.getMenu()._updateButtonState(this)};e.prototype.setVisible=function(t){if(this.getVisible()==t){return this}this.setProperty("visible",t);this.getMenu()&&this.getMenu()._setItemVisibility(this,t);return this};return e});