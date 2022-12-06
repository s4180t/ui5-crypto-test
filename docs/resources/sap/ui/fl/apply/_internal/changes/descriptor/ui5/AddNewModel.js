/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e=["OData","INA","XML","JSON","FHIR","http","WebSocket"];var t=e.concat(["ODataAnnotation"]);function n(e,t,n){return!e[t].type||n.indexOf(e[t]["type"])>=0}function r(e,t){return s(e).some(function(e){return(!e.type||e["type"]==="OData")&&e["settings"]["annotations"].indexOf(t)>=0})}function o(t,n,r){return a(n,r,e)||i(t,r)}function a(e,t,r){return u(e,t)&&n(e,t,r)}function i(e,t){if(u(e,t)){if(e[t].type&&e[t]["type"]==="ODataAnnotation"){throw new Error("The already existing dataSource '"+t+"' in the manifest is type of 'ODataAnnotation'. A model must not reference to a dataSource which is of type 'ODataAnnotation'")}return true}return false}function u(e,t){return e&&Object.keys(e).indexOf(t)>=0}function c(e,t,n){if(t){Object.keys(t).forEach(function(r){if(e[r]){throw new Error("The "+n+" '"+r+"' already exists")}e[r]=t[r]})}}function d(e,t,n,r,o){if(!e[n][r]){e[n][r]={}}c(e[n][r],t.getContent()[o],o);return e[n][r]}function f(e,t,n){if(e[n].type==="ODataAnnotation"){return true}return s(t).some(function(e){return e.dataSource&&e["dataSource"]===n})}function h(e,t){return e[t].type||e[t].dataSource}function s(e){return Object.keys(e).map(function(t){return e[t]})}var y={applyChange:function(a,i){var u=i.getContent().model;var c=i.getContent().dataSource;if(u){if(Object.keys(u).length!==1){throw new Error("There are currently '"+Object.keys(u).length+"' models in the change. Currently it is only allowed to add '1' model")}Object.keys(u).forEach(function(t){if(!h(u,t)){throw new Error("There is no 'dataSource' or 'type' in the change model defined. Please define either 'type' or 'dataSource' in property '"+t+"'")}if(u[t].dataSource){if(!o(a["sap.app"]["dataSources"],c,u[t]["dataSource"])){throw new Error("The defined dataSource '"+u[t]["dataSource"]+"' in the model does not exists as dataSource or must be allowed type of "+e.join("|"))}}})}else{throw new Error("No model defined")}if(c){Object.keys(c).forEach(function(e){if(!n(c,e,t)){throw new Error("The dataSource '"+e+"' has the type '"+c[e]["type"]+"', but only dataSources with the follwing types are supported: "+t.join("|"))}if(!f(c,u,e)){throw new Error("The dataSource in the change '"+e+"' is not used by any model in the change. A dataSource in the change must be used by model in the change")}if(c[e]["type"]==="ODataAnnotation"){if(!r(c,e)){throw new Error("There is no dataSource with type 'OData' defined which includes the annotation '"+e+"'")}}})}d(a,i,"sap.ui5","models","model");d(a,i,"sap.app","dataSources","dataSource");return a}};return y});