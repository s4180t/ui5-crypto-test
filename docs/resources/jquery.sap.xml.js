/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/util/XMLHelper"],function(e,r){"use strict";e.sap.parseXML=r.parse;e.sap.serializeXML=function(e){var a="";if(window.ActiveXObject){a=e.xml;if(a){return a}}if(window.XMLSerializer){return r.serialize(e)}return a};e.sap.isEqualNode=function(r,a){if(r===a){return true}if(!r||!a){return false}if(r.isEqualNode){return r.isEqualNode(a)}if(r.nodeType!=a.nodeType){return false}if(r.nodeValue!=a.nodeValue){return false}if(r.baseName!=a.baseName){return false}if(r.nodeName!=a.nodeName){return false}if(r.nameSpaceURI!=a.nameSpaceURI){return false}if(r.prefix!=a.prefix){return false}if(r.nodeType!=1){return true}if(r.attributes.length!=a.attributes.length){return false}for(var t=0;t<r.attributes.length;t++){if(!e.sap.isEqualNode(r.attributes[t],a.attributes[t])){return false}}if(r.childNodes.length!=a.childNodes.length){return false}for(var t=0;t<r.childNodes.length;t++){if(!e.sap.isEqualNode(r.childNodes[t],a.childNodes[t])){return false}}return true};e.sap.getParseError=r.getParseError;return e});