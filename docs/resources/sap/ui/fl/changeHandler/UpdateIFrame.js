/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/extend","sap/ui/fl/changeHandler/condenser/Classification"],function(e,t){"use strict";var n={};var r=["width","height","url","_settings"];function i(e,t){var n={};var i=[];r.forEach(function(r){var o=Promise.resolve().then(e.getProperty.bind(e,t,r)).then(function(e){if(e!==undefined){n[r]=e}});i.push(o)});return Promise.all(i).then(function(){return n})}function o(t,n,r){var i=e({_settings:r},r);return Promise.resolve().then(t.applySettings.bind(t,n,i))}n.applyChange=function(e,t,n){var r=n.modifier;return r.getControlMetadata(t).then(function(e){if(e.getName()!=="sap.ui.fl.util.IFrame"){return Promise.reject(new Error("UpdateIFrame only for sap.ui.fl.util.IFrame"))}return i(r,t)}).then(function(n){e.setRevertData({originalSettings:n});return o(r,t,e.getContent())})};n.revertChange=function(e,t,n){var r=e.getRevertData();return Promise.resolve().then(function(){if(r){if(r.originalSettings._settings&&r.originalSettings._settings.url){r.originalSettings.url=r.originalSettings._settings.url}return o(n.modifier,t,r.originalSettings)}return Promise.reject(new Error("Attempt to revert an unapplied change."))}).then(function(){e.resetRevertData()})};n.completeChangeContent=function(e,t){if(!t.content||!Object.keys(t.content).some(function(e){return r.indexOf(e)!==-1})){throw new Error("oSpecificChangeInfo attribute required")}e.setContent(t.content)};n.getCondenserInfo=function(e){return{classification:t.Update,affectedControl:e.getSelector(),uniqueKey:"iFrame",updateContent:e.getContent()}};return n},true);