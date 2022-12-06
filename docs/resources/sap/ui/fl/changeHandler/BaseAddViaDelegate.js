/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/condenser/Classification","sap/ui/fl/changeHandler/Base","sap/ui/fl/apply/api/DelegateMediatorAPI","sap/base/util/merge","sap/base/util/ObjectPath"],function(e,t,n,r,o){"use strict";function a(e){return typeof e==="function"}function i(e){if(e.modelType){return e.modelType}else if(e.oDataServiceVersion){return"sap.ui.model.odata.v2.ODataModel"}}var l={createAddViaDelegateChangeHandler:function(l){function u(e){return e+l.fieldSuffix}function d(e,t){if(a(l[t])){return!!l[t](e)}return!!l[t]}function f(e){return d(e,"skipCreateLabel")}function c(e){return d(e,"skipCreateLayout")}function p(e,t){var r=t.modifier.bySelector(e.getSelector(),t.appComponent);var o=i(e.getContent());return n.getDelegateForControl({control:r,modifier:t.modifier,modelType:o,supportsDefault:l.supportsDefault}).then(function(t){var n=!a(t.instance.createLayout);return n||c(e.getSupportInformation().oDataInformation)})}function g(e,t,n){var o=r({},t);o.fieldSelector.id=u(o.fieldSelector.id);return n.createControlForProperty(o).then(function(r){if(f(e)){return r}var o=t.modifier.getId(r.control);t.labelFor=o;return n.createLabel(t).then(function(e){return{label:e,control:r.control,valueHelp:r.valueHelp}})})}function s(e,t,n,i){var u=r({aggregationName:l.aggregationName,payload:t.payload||{},parentSelector:e.parentId},n);var d=t.instance;return Promise.resolve().then(function(){if(a(d.createLayout)&&!c(i)){return d.createLayout(u)}}).then(function(e){if(o.get("control",e)){e.layoutControl=true;return e}return g(i,u,d)})}return{applyChange:function(e,o,a){var u=a.appComponent;var d=e.getContent();var f=e.getSupportInformation().oDataInformation;var c=d.newFieldSelector;var p={appComponent:a.appComponent,view:a.view,fieldSelector:c,bindingPath:d.bindingPath,modifier:a.modifier,element:o};if(a.modifier.bySelector(c,u,a.view)){return t.markAsNotApplicable("Control to be created already exists:"+(c.id||c),true)}var g={newFieldSelector:c};e.setRevertData(g);var v=i(d);return n.getDelegateForControl({control:o,modifier:a.modifier,modelType:v,supportsDefault:l.supportsDefault}).then(function(e){return s(d,e,p,f)}).then(function(t){var n=r({},{control:o,innerControls:t,change:e},a);return Promise.resolve().then(function(){return l.addProperty(n)}).then(function(){if(t.valueHelp){var n=a.modifier.getSelector(a.modifier.getId(t.valueHelp),u);var r=e.getRevertData();r.valueHelpSelector=n;e.setRevertData(r)}})})},revertChange:function(e,t,n){var o=n.appComponent;var i=n.modifier;var u=e.getRevertData().newFieldSelector;var d=e.getRevertData().valueHelpSelector;var f=i.bySelector(u,o);var c=e.getDependentControl(l.parentAlias,n)||t;return Promise.resolve().then(i.removeAggregation.bind(i,c,l.aggregationName,f)).then(i.destroy.bind(i,f)).then(function(){if(d){var e=i.bySelector(d,o);return Promise.resolve().then(i.removeAggregation.bind(i,c,"dependents",e)).then(i.destroy.bind(i,e))}}).then(function(){var o=r({},{control:t,change:e},n);if(a(l.revertAdditionalControls)){return Promise.resolve().then(function(){return l.revertAdditionalControls(o)}).then(function(){e.resetRevertData()})}})},completeChangeContent:function(e,t,n){var r=n.appComponent;var o={};if(t.parentId){if(a(l.mapParentIdIntoChange)){l.mapParentIdIntoChange(e,t,n)}else{e.addDependentControl(t.parentId,l.parentAlias,n)}try{o.parentId=n.modifier.getSelector(t.parentId,r)}catch(e){}}else{throw new Error("mSpecificChangeInfo.parentId attribute required")}if(t.bindingPath){o.bindingPath=t.bindingPath}else{throw new Error("mSpecificChangeInfo.bindingPath attribute required")}if(t.newControlId){o.newFieldSelector=n.modifier.getSelector(t.newControlId,r)}else{throw new Error("mSpecificChangeInfo.newControlId attribute required")}if(t.index===undefined){throw new Error("mSpecificChangeInfo.targetIndex attribute required")}else{o.newFieldIndex=t.index}if(t.oDataServiceVersion){o.oDataServiceVersion=t.oDataServiceVersion}if(t.modelType&&l.supportsDefault){o.modelType=t.modelType}e.setContent(o)},getChangeVisualizationInfo:function(e){var t=e.getRevertData();if(t&&t.labelSelector){return{affectedControls:[t.labelSelector]}}return{affectedControls:[e.getContent().newFieldSelector]}},getCondenserInfo:function(t,n){return p(t,n).then(function(n){if(!n){return undefined}if(!t.getContent().newFieldSelector||!t.getContent().parentId||!l.aggregationName){return undefined}return{affectedControl:t.getContent().newFieldSelector,classification:e.Create,targetContainer:t.getContent().parentId,targetAggregation:l.aggregationName,setTargetIndex:function(e,t){var n=e.getContent();n.newFieldIndex=t;e.setContent(n)},getTargetIndex:function(e){return e.getContent().newFieldIndex}}})}}}};return l});