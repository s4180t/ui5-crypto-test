/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(e){"use strict";var t;if(e.module){t=e.module;e.module=undefined}sap.ui.define(["sap/base/util/extend","sap/base/util/ObjectPath","sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/ui/core/Element","sap/ui/core/mvc/View","sap/ui/test/matchers/Ancestor","sap/ui/test/matchers/MatcherFactory","sap/ui/test/pipelines/MatcherPipeline","sap/ui/test/_OpaLogger"],function(e,t,n,i,r,o,l,s,a,g){var u=i.extend("sap.ui.test.OpaPlugin",{constructor:function(){this._oLogger=g.getLogger("sap.ui.test.Opa5");this._oMatcherFactory=new s},getAllControls:function(e,t){var n=r.registry.filter(c(e));this._oLogger.debug("Found "+n.length+" controls"+(e?" of type '"+(t||e)+"'":"")+" in page");return n},getView:function(e){var t=this.getAllControls(o,"View");var n=t.filter(function(t){return t.getViewName()===e});this._oLogger.debug("Found "+n.length+" views with viewName '"+e+"'");if(n.length>1){n=n.filter(function(e){var t=e.$();return t.length>0&&t.is(":visible")&&t.css("visibility")!=="hidden"});this._oLogger.debug("Found "+n.length+" visible views with viewName '"+e+"'");if(n.length!==1){this._oLogger.debug("Cannot identify controls uniquely. Please provide viewId to locate the exact view.");n=[]}}return n[0]},_getMatchingView:function(e){var t=null;var n;if(e.viewName){var i=(e.viewNamespace||"")+"."+(e.viewName||"");n=i.replace(/\.+/g,".").replace(/^\.|\.$/g,"")}if(e.viewId){var l=r.registry.get(e.viewId);if(l instanceof o&&(!n||l.getViewName()===n)){t=l}}else{t=this.getView(n)}this._oLogger.debug("Found "+(t?"":"no ")+"view with ID '"+e.viewId+"' and viewName '"+n+"'");return t},getControlInView:function(e){var t=this._getMatchingView(e);var n=typeof e.id==="string";if(!t){return n?null:[]}var i=t.getViewName();var r=e.fragmentId?e.fragmentId+u.VIEW_ID_DELIMITER:"";if(Array.isArray(e.id)){var o=[];var l=[];e.id.map(function(e){return r+e}).forEach(function(e){var n=t.byId(e);if(n){o.push(n)}else{l.push(e)}});this._oLogger.debug("Found "+o.length+" controls with ID contained in "+e.id+" in view '"+i+"'"+l.length?". Found no controls matching the subset of IDs "+l:"");if(o.length&&e.controlType){var s=this._filterUniqueControlsByCondition(o,c(e.controlType));this._oLogger.debug("Found "+(s.length?s.length:"no")+" controls in view '"+i+"' with control type matching '"+e.sOriginalControlType+"' and ID contained in "+e.id);if(s.length!==o.length){this._oLogger.error("Some results don't match the desired controlType '"+e.sOriginalControlType+"'. Please double check the expected controlType - this might lead to unexpected test results!")}}return o}if(n){var a=r+e.id;var g=t.byId(a)||null;if(g){if(c(e.controlType)(g)){this._oLogger.debug("Found control with ID '"+a+"' and controlType '"+e.sOriginalControlType+"' in view '"+i+"'")}else{this._oLogger.error("Found control with ID '"+a+"' in view '"+i+"' but it does not have required controlType '"+e.sOriginalControlType+"'. Please double check the expected controlType - this might lead to unexpected test results!")}return g}else{this._oLogger.debug("Found no control with ID '"+a+"' in view '"+i+"'");return g}}var h=this.getAllControlsWithTheParent(t,e.controlType,e.sOriginalControlType);var d=this._isRegExp(e.id);if(d){h=h.filter(function(n){var i=this._getUnprefixedControlId(n.getId(),t.getId(),e.fragmentId);return e.id.test(i)}.bind(this))}this._oLogger.debug("Found "+h.length+" controls of type "+e.sOriginalControlType+(d?" with ID matching "+e.id:"")+" in view '"+i+"'");return h},getAllControlsWithTheParent:function(e,t,n){var i=new l(e);return this._filterUniqueControlsByCondition(this.getAllControls(t,n),i)},getAllControlsInContainer:function(e,t,n,i){var r=c(t),o=this._filterUniqueControlsByCondition(this._getControlsInContainer(e),r);this._oLogger.debug("Found "+o.length+" controls in "+(i?i:"container")+" with controlType '"+n+"'");return o},_getControlsInStaticArea:function(e){var t=n(sap.ui.getCore().getStaticAreaRef());var i=this._getControlsInContainer(t)||[];if(e.id){i=this._filterUniqueControlsByCondition(i,function(t){var n=t.getId();var i=this._getMatchingView(e);if(i){if(this._isControlInView(t,i.getViewName())){n=this._getUnprefixedControlId(t.getId(),i.getId(),e.fragmentId)}}var r=false;if(typeof e.id==="string"){r=n===e.id}if(this._isRegExp(e.id)){r=e.id.test(n)}if(Array.isArray(e.id)){r=e.id.filter(function(e){return e===n}).length>0}return r}.bind(this));this._oLogger.debug("Found "+(i.length?i.length:"no")+" controls in the static area with ID matching '"+e.id+"'"+(e.fragmentId?" and fragmentId: '"+e.fragmentId+"'":""))}if(i.length&&e.controlType){var r=c(e.controlType);i=this._filterUniqueControlsByCondition(i,r);this._oLogger.debug("Found "+(i.length?i.length:"no")+" controls in the static area with control type matching '"+e.sOriginalControlType+"'")}if(e.id&&typeof e.id==="string"){return i[0]||null}else{return i}},_getControlsInContainer:function(e){var t=e.find("*").control();var n=[];t.forEach(function(e){var t=!n.filter(function(t){return t.getId()===e.getId()}).length;if(t){n.push(e)}});return n},_isControlInView:function(e,t){if(!e){return false}if(e.getViewName&&e.getViewName()===t){return true}else{return this._isControlInView(e.getParent(),t)}},_isRegExp:function(e){return Object.prototype.toString.call(e)==="[object RegExp]"},getMatchingControls:function(e){var t=null;e=e||{};var n=this._modifyControlType(e);if(!n){return typeof e.id==="string"?t:[]}if(e.searchOpenDialogs){t=this._getControlsInStaticArea(e)}else if(e.viewName||e.viewId){t=this.getControlInView(e)}else if(e.id){t=this.getControlByGlobalId(e)}else if(e.controlType){t=this.getAllControls(e.controlType,e.sOriginalControlType)}else{t=this.getAllControls()}if(!t){return t}var i=this._oMatcherFactory.getStateMatchers({visible:e.visible,interactable:e.interactable,enabled:typeof e.enabled==="undefined"?e.interactable:e.enabled,editable:typeof e.editable==="undefined"?false:e.editable});var r=u._oMatcherPipeline.process({control:t,matchers:i});if(!r){if(Array.isArray(t)){return[]}if(t){return null}return t}return r},_getFilteredControls:function(t){var n=this._filterControlsByCondition(t);var i=e({},t);["interactable","visible","enabled","editable"].forEach(function(e){delete i[e]});return n===u.FILTER_FOUND_NO_CONTROLS?u.FILTER_FOUND_NO_CONTROLS:this._filterControlsByMatchers(i,n)},_filterControlsByCondition:function(e){var t=null;var n=this._isLookingForAControl(e);if(n){t=this.getMatchingControls(e)}var i=[typeof e.id==="string"&&!t,this._isRegExp(e.id)&&!t.length,Array.isArray(e.id)&&(!t||t.length!==e.id.length),e.controlType&&Array.isArray(t)&&!t.length,!e.id&&(e.viewName||e.viewId||e.searchOpenDialogs)&&!t.length];return i.some(Boolean)?u.FILTER_FOUND_NO_CONTROLS:t},_filterControlsByMatchers:function(t,n){var i=e({},t);var r=this._oMatcherFactory.getFilteringMatchers(i);var o=this._isLookingForAControl(t);var l=null;if((n||!o)&&r.length){l=u._oMatcherPipeline.process({matchers:r,control:n});if(!l){return u.FILTER_FOUND_NO_CONTROLS}}else{l=n}return l},getControlByGlobalId:function(e){var t=c(e.controlType);if(typeof e.id==="string"){var n=r.registry.get(e.id)||null;if(n&&!t(n)){this._oLogger.error("A control with global ID '"+e.id+"' is found but does not have required controlType '"+e.sOriginalControlType+"'. Found control is '"+n+"' but null is returned instead");return null}this._oLogger.debug("Found "+(n?"":"no ")+"control with the global ID '"+e.id+"'");return n}var i=[];var o=this._isRegExp(e.id);if(o){r.registry.forEach(function(t,n){if(e.id.test(n)){i.push(n)}})}else if(Array.isArray(e.id)){i=e.id}var l=[];var s=[];i.forEach(function(e){var n=r.registry.get(e);if(n&&t(n)&&!n.bIsDestroyed){l.push(n)}else{s.push(e)}});var a=!o&&s.length?". Found no controls of matching the subset of IDs "+s:"";this._oLogger.debug("Found "+l.length+" controls of type "+e.sOriginalControlType+(o?" with ID matching '":" with ID contained in '")+e.id+a);return l},getControlConstructor:function(e){if(sap.ui.lazyRequire._isStub(e)){this._oLogger.debug("The control type "+e+" is currently a lazy stub.");return null}var n=t.get(e);if(!n){this._oLogger.debug("The control type "+e+" is undefined.");return null}if(typeof n!=="function"){this._oLogger.debug("The control type "+e+" must be a function.");return null}return n},_isLookingForAControl:function(e){return Object.keys(e).some(function(t){return u._aControlSelectorsForMatchingControls.indexOf(t)!==-1&&!!e[t]})},_filterUniqueControlsByCondition:function(e,t){return e.filter(function(e,n,i){var r=!!t(e);return r&&i.indexOf(e)===n})},_modifyControlType:function(e){var t=e.controlType;if(typeof t!=="string"){if(t&&t._sapUiLazyLoader){this._oLogger.debug("The control type is currently a lazy stub");return false}return true}var n=this.getControlConstructor(t);if(!n){return false}e.sOriginalControlType=t;e.controlType=n;return true},_getUnprefixedControlId:function(e,t,n){var i=e.replace(t+u.VIEW_ID_DELIMITER,"");if(n){if(i.startsWith(n+u.VIEW_ID_DELIMITER)){i=i.replace(n+u.VIEW_ID_DELIMITER,"")}else{i=""}}return i}});function c(e){return function(t){if(!e){return true}return t instanceof e}}u._oMatcherPipeline=new a;u._aControlSelectorsForMatchingControls=["id","viewName","viewId","controlType","searchOpenDialogs"];u.FILTER_FOUND_NO_CONTROLS="FILTER_FOUND_NO_CONTROL";u.VIEW_ID_DELIMITER="--";return u});if(t){e.module=t}})(window);