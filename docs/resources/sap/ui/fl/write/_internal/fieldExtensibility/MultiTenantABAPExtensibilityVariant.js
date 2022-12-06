/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/fieldExtensibility/ABAPExtensibilityVariant","sap/ui/fl/write/_internal/fieldExtensibility/Utils"],function(t,e){"use strict";var n="/sap/opu/odata/sap/APS_PREDEFINED_FIELD_SRV/GetExtensionDataByResourcePath";var i={semanticObject:"PredefinedCustomField",action:"configure"};var s=t.extend("sap.ui.fl.write._internal.fieldExtensibility.MultiTenantABAPExtensibilityVariant",{getExtensionData:function(){return this._oExtensionDataPromise.then(function(t){if(this._containsData(t)){return this._convertExtensionData(t)}return null}.bind(this))},getNavigationUri:function(){return this._oExtensionDataPromise.then(function(t){if(this._containsData(t)){return e.getNavigationUriForIntent({target:i,params:{businessObjectNodeName:t.BusinessObjectNodeName,cdsEntityName:t.CdsEntityName,serviceVersion:this._mServiceInfo.serviceVersion,serviceName:this._mServiceInfo.serviceName}})}return null}.bind(this))},getTexts:function(){return this._oExtensionDataPromise.then(function(t){if(this._containsData(t)){return{tooltip:e.getText("BTN_ADD_FIELD"),headerText:e.getText("BUSINESS_OBJECT_NODE_TITLE")}}return null}.bind(this))},isActive:function(){return this._oExtensionDataPromise.then(function(t){return this._containsData(t)}.bind(this))},_containsData:function(t){return Boolean(t&&t.BusinessObjectNodeName&&t.CdsEntityName)},_convertExtensionData:function(t){return{extensionData:[{businessContext:t.BusinessObjectNodeName,description:t.BusinessObjectNodeDescription}]}},_determineExtensionData:function(){return new Promise(function(t,s){e.isNavigationSupportedForIntents([i]).then(function(i){var a=i.some(function(t){return t===true});if(a){e.executeRequest(n,{ResourcePath:this._sServiceUri,EntitySetName:this._mBindingInfo.entitySetName}).then(function(e){if(e.errorOccurred===false){t(this._extractExtensionDataFromResponse(e.result))}else{s(e)}}.bind(this))}else{t(null)}}.bind(this))}.bind(this))},_extractExtensionDataFromResponse:function(t){return t.GetExtensionDataByResourcePath}});return s});