/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/DataType","sap/ui/base/ManagedObject","./Control","./CustomData","./HTML","./mvc/View","./mvc/EventHandlerResolver","sap/base/Log","sap/base/util/ObjectPath","sap/base/assert","sap/base/strings/camelize"],function(t,e,a,r,i,n,o,s,u,g,l,p){"use strict";var d={};d.attributes={"data-sap-ui-type":true,"data-sap-ui-id":true,"data-sap-ui-aggregation":true,"data-sap-ui-default-aggregation":true,"data-sap-ui-binding":function(t,e){var r=a.bindingParser(t);e.objectBindings=e.objectBindings||{};e.objectBindings[r.model||undefined]=r},"data-tooltip":function(t,e){e["tooltip"]=t},tooltip:function(t,e,a){e["tooltip"]=t;u.warning('[Deprecated] Control "'+e.id+'": The attribute "tooltip" is not prefixed with "data-*". Future version of declarative support will only suppport attributes with "data-*" prefix.')},class:true,style:true,id:true};d.compile=function(e,a,r){var i=this;t(e).find("[data-sap-ui-type]").filter(function(){return t(this).parents("[data-sap-ui-type]").length===0}).each(function(){i._compile(this,a,r)})};d._compile=function(e,a,i){var n=t(e);var o=n.attr("data-sap-ui-type");var s=[];var u=o==="sap.ui.core.UIArea";var g=e.getAttributeNames();if(u){var l=this;n.children().each(function(){var t=l._createControl(this,a);if(t){s.push(t)}})}else{var p=this._createControl(e,a);if(p){s.push(p)}}n.empty();var d=[];for(var f=0;f<g.length;f++){var c=g[f];if(!u||u&&/^data-/g.test(c.toLowerCase())){d.push(c)}}if(d.length>0){n.removeAttr(d.join(" "))}s.forEach(function(t){if(t instanceof r){if(a&&!i){a.addContent(t)}else{t.placeAt(e);if(a){a.connectControl(t)}}}})};d._createControl=function(e,a){var r=t(e);var i=null;var n=r.attr("data-sap-ui-type");if(n){var s=sap.ui.requireSync(n.replace(/\./g,"/"));s=s||g.get(n);l(typeof s!=="undefined","Class not found: "+n);var u={};u.id=this._getId(r,a);if(a&&a._sProcessingMode!=null&&s.getMetadata().hasSpecialSetting("processingMode")){u.processingMode=a._sProcessingMode}this._addSettingsForAttributes(u,s,e,a);this._addSettingsForAggregations(u,s,e,a);var i;if(o.prototype.isPrototypeOf(s.prototype)&&typeof s._sType==="string"){i=o._create(u,undefined,s._sType)}else{i=new s(u)}if(e.className){i.addStyleClass(e.className)}r.removeAttr("data-sap-ui-type")}else{i=this._createHtmlControl(e,a)}return i};d._createHtmlControl=function(t,e){var a=new n;a.setDOMContent(t);this.compile(t,e,true);return a};d._addSettingsForAttributes=function(t,e,r,n){var o=this;var u=d.attributes;var g=a.bindingParser;var f=[];var c=/^data-custom-data:(.+)/i;var v=r.getAttributeNames();for(var h=0;h<v.length;h++){var y=v[h];var b=r.getAttribute(y);if(!c.test(y)){if(typeof u[y]==="undefined"){y=o.convertAttributeToSettingName(y,t.id);var m=o._getProperty(e,y);if(m){var _=g(b,n&&n.getController(),true);if(_&&typeof _==="object"){t[y]=_}else{t[y]=o.convertValueToType(o.getPropertyDataType(m),_||b)}}else if(o._getAssociation(e,y)){var A=o._getAssociation(e,y);if(A.multiple){b=b.replace(/\s*,\s*|\s+/g,",");t[y]=b.split(",").map(function(t){return n?n.createId(t):t})}else{t[y]=n?n.createId(b):b}}else if(o._getAggregation(e,y)){var w=o._getAggregation(e,y);if(w.multiple){var _=g(b,n&&n.getController());if(_){t[y]=_}else{throw new Error("Aggregation "+y+" with cardinality 0..n only allows binding paths as attribute value")}}else if(w.altTypes){var _=g(b,n&&n.getController(),true);if(_&&typeof _==="object"){t[y]=_}else{t[y]=o.convertValueToType(w.altTypes[0],_||b)}}else{throw new Error("Aggregation "+y+" not supported")}}else if(o._getEvent(e,y)){var C=n&&(n._oContainingView||n).getController();var T=s.resolveEventHandler(b,C);if(T){t[y]=T}else{throw new Error('Control "'+t.id+'": The function "'+b+'" for the event "'+y+'" is not defined')}}else{l(y==="id","DeclarativeSupport encountered unknown setting '"+y+"' for class '"+e.getMetadata().getName()+"' (value:'"+b+"')")}}else if(typeof u[y]==="function"){u[y](b,t,e)}}else{y=p(c.exec(y)[1]);var _=g(b,n&&n.getController());f.push(new i({key:y,value:_||b}))}}if(f.length>0){t.customData=f}return t};d._addSettingsForAggregations=function(e,a,r,i){var n=t(r);var o=this._getDefaultAggregation(a,r);var s=this;var u=a.getMetadata().getAllAggregations();n.children().each(function(){var a=t(this);var r=a.attr("data-sap-ui-aggregation");var n=a.attr("data-sap-ui-type");var g=false;if(!r){g=true;r=o}if(r&&u[r]){var p=u[r].multiple;var d=function(t){var a=s._createControl(t,i);if(a){if(p){if(!e[r]){e[r]=[]}if(typeof e[r].path==="string"){l(!e[r].template,"list bindings support only a single template object");e[r].template=a}else{e[r].push(a)}}else{e[r]=a}}};if(g||n&&!g){d(this)}else{a.children().each(function(){d(this)})}}a.removeAttr("data-sap-ui-aggregation");a.removeAttr("data-sap-ui-type")});return e};d._getId=function(e,a){var r=t(e);var i=r.attr("id");if(i){if(a){i=a.createId(i);r.attr("data-sap-ui-id",i)}r.attr("id","")}return i};d._getProperty=function(t,e){return t.getMetadata().getProperty(e)};d.convertValueToType=function(t,r){if(t instanceof e){r=t.parseValue(r)}return typeof r==="string"?a.bindingParser.escape(r):r};d.getPropertyDataType=function(t){var a=e.getType(t.type);if(!a){throw new Error("Property "+t.name+" has no known type")}return a};d.convertAttributeToSettingName=function(t,e,a){if(t.indexOf("data-")===0){t=t.substr(5)}else if(a){u.warning('[Deprecated] Control "'+e+'": The attribute "'+t+'" is not prefixed with "data-*". Future version of declarative support will only suppport attributes with "data-*" prefix.')}else{throw new Error('Control "'+e+'": The attribute "'+t+'" is not prefixed with "data-*".')}return p(t)};d._getAssociation=function(t,e){return t.getMetadata().getAssociation(e)};d._getAggregation=function(t,e){return t.getMetadata().getAggregation(e)};d._getEvent=function(t,e){return t.getMetadata().getEvent(e)};d._getDefaultAggregation=function(e,a){var r=t(a);var i=r.attr("data-sap-ui-default-aggregation")||e.getMetadata().getDefaultAggregationName();r.removeAttr("data-sap-ui-default-aggregation");return i};return d},true);