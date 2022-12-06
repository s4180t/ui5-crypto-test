/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert"],function(e){"use strict";var t=function(e,t){this._oControl=e;this._sAggregation=t;var n=new URLSearchParams(window.location.search);this._bEnableV4=n.get("sap-ui-xx-v4tree")==="true"};t.prototype.isTreeBinding=function(){var e=this._oControl.getModel(this._oControl.getBindingInfo(this._sAggregation).model);if(e.isA("sap.ui.model.odata.v4.ODataModel")){return false}return true};t.prototype.isLeaf=function(e){var t=this._oControl.getBinding();var n=this._getBindingName(t);switch(n){case undefined:return true;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}var i=this.getContextByIndex(e);return i?i.getProperty("@$ui5.node.isExpanded")===undefined:true;default:var o=this.getNodeByIndex(e);return!t.nodeHasChildren(o)}};t.prototype.getNodeByIndex=function(e){var t=this._oControl.getBinding();var n=this._getBindingName(t);switch(n){case undefined:return undefined;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}return this.getContextByIndex(e);default:return t.getNodeByIndex(e)}};t.prototype.getContextByIndex=function(e){var t=this._oControl.getBinding();var n=this._getBindingName(t);switch(n){case undefined:return undefined;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}return t.getContexts(e,1,0,true)[0];default:return t.getContextByIndex(e)}};t.prototype.isExpanded=function(e){var t=this._oControl.getBinding();var n=this._getBindingName(t);switch(n){case undefined:return false;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}var i=this.getContextByIndex(e);return i?!!i.getProperty("@$ui5.node.isExpanded"):false;default:return t?t.isExpanded(e):false}};t.prototype.expand=function(e){var t=this._oControl.getBinding();var o=this._getBindingName(t);var r={proxy:this,binding:t,indices:e,expanded:true};if(typeof r.indices==="number"){r.indices=[e]}switch(o){case undefined:break;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}i(r);break;default:n(r)}};t.prototype.collapse=function(e){var t=this._oControl.getBinding();var o=this._getBindingName(t);var r={proxy:this,binding:t,indices:e,expanded:false};if(typeof r.indices==="number"){r.indices=[e]}switch(o){case undefined:break;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}i(r);break;default:n(r)}};function n(e){var t=e.indices.filter(function(t){return t>=0&&t<e.binding.getLength()&&!e.proxy.isLeaf(t)&&e.expanded!==e.proxy.isExpanded(t)}).sort(function(e,t){return e-t});if(t.length===0){return}for(var n=t.length-1;n>0;n--){if(e.expanded){e.binding.expand(t[n],true)}else{e.binding.collapse(t[n],true)}}if(e.expanded){e.binding.expand(t[0],false)}else{e.binding.collapse(t[0],false)}}function i(e){for(var t=0;t<e.indices.length;t++){var n=e.proxy.getContextByIndex(e.indices[t]);if(n){if(e.expanded){n.expand()}else{n.collapse()}}}}t.prototype.toggleExpandedState=function(e){if(this.isExpanded(e)){this.collapse(e)}else{this.expand(e)}};t.prototype.getContexts=function(e,t,n,i){var o=this._oControl.getBinding();var r=this._getBindingName(o);var a=[];var s=0;switch(r){case undefined:break;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}a=o.getContexts(e,t,n,i);break;default:s=1;var d=o?o.getNodes(e,t,n):[];d.forEach(function(e){var t=e.context;if(e.context){if(e.nodeState){t["_mProxyInfo"]={};t["_mProxyInfo"].nodeState=e.nodeState}a.push(e.context)}},this);break}for(var p=0;p<a.length;p++){var u=p+e;var l=a[p];if(!l){continue}if(!l["_mProxyInfo"]){l["_mProxyInfo"]={}}l["_mProxyInfo"].level=this.getLevel(u)+s;l["_mProxyInfo"].isLeaf=this.isLeaf(u);l["_mProxyInfo"].isExpanded=this.isExpanded(u)}return a};function o(e,t){var n=Object.assign(e.getAggregation(),{expandTo:t});e.setAggregation(n)}t.prototype.collapseAll=function(){var e=this._oControl.getBinding();var t=this._getBindingName(e);switch(t){case undefined:break;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}o(e,1);break;default:e.collapseToLevel(0)}};t.prototype.expandToLevel=function(t){var n=this._oControl.getBinding();var i=this._getBindingName(n);switch(i){case undefined:break;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}o(n,t);break;default:if(n.expandToLevel){n.expandToLevel(t)}else{e(n.expandToLevel,"Expanding all nodes to a certain level"+" is not supported with your current binding.")}}};t.prototype.setRootLevel=function(t){var n=this._oControl.getBinding();var i=this._getBindingName(n);switch(i){case undefined:break;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}throw Error("Setting the root level is not supported with your current binding.");default:if(n.setRootLevel){n.setRootLevel(t)}else{e(n.setRootLevel,"Setting the root level is not supported with"+" your current binding.")}}};t.prototype.setCollapseRecursive=function(t){var n=this._oControl.getBinding();var i=this._getBindingName(n);switch(i){case undefined:break;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}throw Error("Setting 'collapseRecursive' is not supported with your"+" current binding.");default:if(n.setCollapseRecursive){n.setCollapseRecursive(t)}else{e(n.setCollapseRecursive,"Setting 'collapseRecursive' is"+" not supported with your current binding.")}}};t.prototype.getLevel=function(e){var t=this._oControl.getBinding();var n=this._getBindingName(t);switch(n){case undefined:return undefined;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}var i=this.getContextByIndex(e);return i?i.getProperty("@$ui5.node.level"):undefined;default:var o=this.getNodeByIndex(e);return o?o.level:undefined}};t.prototype.getSiblingCount=function(e){var t=this._oControl.getBinding();var n=this._getBindingName(t);switch(n){case undefined:return 0;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}throw Error("The number of siblings of a node cannot be determined"+" with your current binding.");default:var i=this.getNodeByIndex(e);return i&&i.parent?i.parent.children.length:0}};t.prototype.getPositionInParent=function(e){var t=this._oControl.getBinding();var n=this._getBindingName(t);switch(n){case undefined:return-1;case"sap.ui.model.odata.v4.ODataListBinding":if(!this._bEnableV4){throw new Error("UnsupportedOperationException: OData V4 is not supported")}throw Error("The position of a node in its parent cannot be determined"+" with your current binding.");default:var i=this.getNodeByIndex(e);return i?i.positionInParent:-1}};t.prototype.isSelectionSupported=function(){var e=this._oControl.getBinding();var t=this._getBindingName(e);switch(t){case undefined:case"sap.ui.model.odata.v4.ODataListBinding":return false;default:return true}};t.prototype.applyLegacySettingsToBindingInfo=function(e,t){if(!e.parameters){e.parameters={}}if(!("rootLevel"in e.parameters)&&t.rootLevel!==undefined){e.parameters.rootLevel=t.rootLevel}if(!("collapseRecursive"in e.parameters)&&t.collapseRecursive!==undefined){e.parameters.collapseRecursive=t.collapseRecursive}if(!("numberOfExpandedLevels"in e.parameters)&&t.numberOfExpandedLevels!==undefined){e.parameters.numberOfExpandedLevels=t.numberOfExpandedLevels}};t.prototype._getBindingName=function(t){e(t,"Control does not have a binding.");return t?t.getMetadata().getName():undefined};return t});