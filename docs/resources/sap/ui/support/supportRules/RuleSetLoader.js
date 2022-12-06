/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/extend","sap/base/util/ObjectPath","sap/ui/VersionInfo","sap/ui/support/supportRules/RuleSet","sap/ui/support/supportRules/CommunicationBus","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/RuleSerializer","sap/ui/support/supportRules/Constants","sap/ui/support/supportRules/util/EvalUtils","sap/ui/support/supportRules/util/Utils","sap/ui/thirdparty/jquery","sap/ui/core/Configuration"],function(e,t,r,u,i,a,s,n,l,o,p,c,f){"use strict";var R=function(){var e;return function(t){if(!e){e=document.createElement("a")}e.href=t;return e.href.replace(/\/$/,"")}}();var h="sprt";var S=sap.ui.require.toUrl("sap/ui/support");var b=S.replace("/sap/ui/support","");var _=R(b);var m={};m._mRuleSets={};m.getRuleSets=function(){return this._mRuleSets};m.addRuleSet=function(e,t){this._mRuleSets[e]=t};m.getRuleSet=function(e){return this._mRuleSets[e]};m._fetchSupportRuleSets=function(e,t){var r=this,l=t||sap.ui.getCore().getLoadedLibraries(),o=this._fetchLibraryNamesWithSupportRules(l);var p=new Promise(function(t){u.load({library:"sap.ui.core"}).then(function(u){i.versionInfo=u;o.then(function(u){var l=r._fetchLibraryFiles(u,m._fetchRuleSet);Promise.all(l).then(function(){r._bRulesCreated=true;a.publish(s.UPDATE_SUPPORT_RULES,{sRuleSet:n.serialize(r._mRuleSets),oVersionInfo:i.versionInfo});t();if(e&&typeof e==="function"){e()}})})})});return p};m.loadAdditionalRuleSets=function(e){var t=this,r=t._fetchLibraryFiles(e,t._fetchRuleSet);Promise.all(r).then(function(){t._bRulesCreated=true;a.publish(s.UPDATE_SUPPORT_RULES,{sRuleSet:n.serialize(t._mRuleSets)})})};m._fetchLibraryNamesWithSupportRules=function(e){return new Promise(function(t){p.canLoadInternalRulesAsync().then(function(r){var u={publicRules:[],internalRules:[],allRules:[]};e=e||{};var i=[];Object.keys(e).forEach(function(e){var t=new Promise(function(t){var r=_+"/"+e.replace(/\./g,"/")+"/.supportrc";c.ajax({type:"GET",dataType:"json",url:r,success:function(r){t({lib:e,rcData:r})},error:function(){t({lib:e,rcData:null})}})});i.push(t)});Promise.all(i).then(function(e){e.forEach(function(e){if(e.rcData){var i=false;if(e.rcData.publicRules){u.publicRules.push(e.lib);i=true}if(r&&e.rcData.internalRules){u.internalRules.push(e.lib);i=true}if(i&&u.allRules.indexOf(e.lib)<0){u.allRules.push(e.lib)}}t(u)})})})})};m._fetchLibraryFiles=function(e,t,r){var u=[],i=this,n=sap.ui.require.toUrl("sap/ui/support"),l=n.replace("sap/ui/support",""),o=p.canLoadInternalRules(),c=o&&e.internalRules.length>0,R=0,h=e.publicRules.length;var S=f.getSupportMode();var b=S&&S.indexOf("silent")>-1;if(c){h+=e.internalRules.length}function _(){R+=1;var e=Math.ceil(R/h*100);a.publish(s.CURRENT_LOADING_PROGRESS,{value:e})}if(e.publicRules.length>0){e.publicRules.forEach(function(e){var a=i._registerLibraryPath(e,n,l);if(a){var s=i._requireRuleSet(a.customizableLibName,t);if(!b&&!r){s.then(function(){_()})}u.push(s)}})}if(o&&e.internalRules.length>0){e.internalRules.forEach(function(e){var a=i._registerLibraryPath(e,n,l);if(a){var s=i._requireRuleSet(a.internalLibName,t);if(!b&&!r){s.then(function(){_()})}u.push(s)}})}return u};m._registerLibraryPath=function(e,t,r){if(this._mRuleSets[e]){return null}var u=e.replace(/\./g,"/");var i=u;var a=this._getLoadFromSupportOrigin();var s={};if(a){i+="/"+h;s[i]=r+u}var n=i+"/internal";var l=r.replace("resources/","")+"test-resources/"+u+"/internal";s[n]=l;sap.ui.loader.config({paths:s});return{internalLibName:n.replace(/\//g,"."),customizableLibName:i.replace(/\//g,".")}};m._requireRuleSet=function(e,t){var r=this;return new Promise(function(u){try{sap.ui.require([e.replace(/\./g,"/")+"/library.support"],function(){t.call(r,e);u()},u)}catch(e){u()}})};m._fetchRuleSet=function(u){try{var a,s,n,o=r.get(u).library.support;if(!o){throw"The library.support file was not fetched successfully."}a=u.replace("."+h,"").replace(".internal","");s=t({},o);n=this._mRuleSets[a];if(!(s.ruleset instanceof i)){s=this._createRuleSet(s)}if(n){n.ruleset._mRules=t(n.ruleset._mRules,s.ruleset._mRules)}else{n=s}this._mRuleSets[a]=n}catch(t){e.error("["+l.SUPPORT_ASSISTANT_NAME+"] Failed to load RuleSet for "+u+" library",t)}};m._getLoadFromSupportOrigin=function(){var e=new URL(sap.ui.require.toUrl("sap/ui/core"),document.baseURI);var t=new URL(sap.ui.require.toUrl("sap/ui/support"),document.baseURI);return e.origin!==t.origin};m.fetchNonLoadedRuleSets=function(e){u.load().then(function(e){var t={};e.libraries.forEach(function(e){t[e.name]=e});return this._fetchLibraryNamesWithSupportRules(t)}.bind(this)).then(function(t){var r=[];t.allRules.forEach(function(t){if(e.indexOf(t)<0){r.push(t)}});a.publish(s.POST_AVAILABLE_LIBRARIES,{libNames:r})})};m._onLibraryChanged=function(e){var t=this;if(e.getParameter("stereotype")==="library"&&m._bRulesCreated){t._oMainPromise=m._fetchSupportRuleSets()}};m.updateRuleSets=function(e){this._oMainPromise=m._fetchSupportRuleSets(e)};m._createRuleSet=function(e){var t={name:e.name,niceName:e.niceName};var r=new i(t);for(var u=0;u<e.ruleset.length;u++){var a=e.ruleset[u];if(Array.isArray(a)){for(var s=0;s<a.length;s++){r.addRule(a[s])}}else{r.addRule(a)}}return{lib:t,ruleset:r}};m.getAllRules=function(){var e={};Object.keys(this._mRuleSets).map(function(r){e=t(e,this._mRuleSets[r].ruleset.getRules())},this);return e};m.getAllRuleDescriptors=function(){var e=this.getAllRules();return Object.keys(e).map(function(t){return{libName:e[t].libName,ruleId:t}})};if(o.isEvalAllowed()){m.addRuleSet(l.TEMP_RULESETS_NAME,{lib:{name:l.TEMP_RULESETS_NAME},ruleset:new i({name:l.TEMP_RULESETS_NAME})})}return m},true);