/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/Core","sap/ui/core/theming/Parameters","sap/m/IllustratedMessage","sap/m/Button"],function(e,t,a,r,n){"use strict";var i={};var o="";var u=parseFloat(e.BaseFontSize);var s=null;var l=null;i.measureText=function(){var e=.05;var r=document.createElement("canvas").getContext("2d");var n=function(){o=[parseFloat(a.get({name:"sapMFontMediumSize"})||"0.875rem")*u+"px",a.get({name:"sapUiFontFamily"})||"Arial"].join(" ");return o};t.attachThemeChanged(n);return function(t,a){r.font=a||o||n();return r.measureText(t||"").width/u+e}}();i.calcTypeWidth=function(){var e=0;var a=[2023,9,26,22,47,58,999];var r=new Date(Date.UTC.apply(0,a));var n=new(Function.prototype.bind.apply(Date,[null].concat(a)));var o={Byte:3,SByte:3,Int16:5,Int32:9,Int64:12,Single:6,Float:12,Double:13,Decimal:15,Integer:9};t.attachThemeChanged(function(){e=0});return function(a,u){var s=a.getMetadata().getName().split(".").pop();var l=u&&u.maxWidth||19;var m=u&&u.gap||0;var c=function(e){return Math.min(e+m,l)};if(s=="Boolean"){if(!e){var p=t.getLibraryResourceBundle("sap.ui.core");var d=i.measureText(p.getText("YES"));var v=i.measureText(p.getText("NO"));e=Math.max(d,v)}return c(e)}if(s=="String"||a.isA("sap.ui.model.odata.type.String")){var g=parseInt(a.getConstraints().maxLength)||0;if(!g||g*.25>l){return l}var h=i.measureText("A".repeat(g));if(g<l||l<10){return c(h)}var f=Math.log(h-l*.16)/Math.log(l/3)*(l/2)*Math.pow(l/19,1/h);return c(Math.min(f,h))}if(s.startsWith("Date")||s.startsWith("Time")){var T=a.getFormatOptions();var x=T.UTC?r:n;var M=x.toLocaleDateString();if(s=="TimeOfDay"){M=new Intl.DateTimeFormat("de",{hour:"numeric",minute:"numeric",second:"numeric"}).format(x);M=a.formatValue(M,"string")}else if(a.isA("sap.ui.model.odata.type.Time")){M=a.formatValue({__edmType:"Edm.Time",ms:r.valueOf()},"string")}else{M=a.formatValue(T.interval?[x,new Date(x*1.009)]:x,"string");(a.oFormat&&a.oFormat.oFormatOptions&&a.oFormat.oFormatOptions.pattern||"").replace(/[MELVec]{3,4}/,function(e){M+=e.length==4?"---":"-"})}return c(i.measureText(M))}if(o[s]){var y=parseInt(a.getConstraints().scale)||0;var C=parseInt(a.getConstraints().precision)||20;C=Math.min(C,o[s]);var L=2*Math.pow(10,C-y-1);L=a.formatValue(L,"string");return c(i.measureText(L))}return u&&u.defaultWidth||8}}();i.calcHeaderWidth=function(){var e="";var r=function(){if(!e){e=[a.get({name:"sapUiColumnHeaderFontWeight"})||"normal",o].join(" ")}return e};t.attachThemeChanged(function(){e=""});return function(e,t,a,n){var o=e.length;a=a||19;n=n||2;if(t>a){return a}if(n>o){return n}if(!t){return i.measureText(e,r())}t=Math.max(t,n);if(t>o){return t}var u=i.measureText(e,r());u=Math.min(u,a*.7);var s=Math.max(1,1-Math.log(Math.max(t-1.7,.2))/Math.log(a*.5)+1);var l=s*t;var m=Math.max(0,u-l);var c=m<.15?u:l+m*(1-1/t)/Math.E;return c}}();i.calcColumnWidth=function(e,t,r){if(!Array.isArray(e)){e=[e]}r=Object.assign({minWidth:2,maxWidth:19,defaultWidth:8,truncateLabel:true,padding:1.0625,gap:0},r);var n=0;var o=Math.max(1,r.minWidth);var s=Math.max(o,r.maxWidth);var l=r.gap+e.reduce(function(e,t){var a=t,n={defaultWidth:r.defaultWidth,maxWidth:r.maxWidth};if(Array.isArray(t)){a=t[0];n=t[1]||n}var o=i.calcTypeWidth(a,n);return r.verticalArrangement?Math.max(e,o):e+o+(e&&.5)},0);if(t){n=i.calcHeaderWidth(t,r.truncateLabel?l:0,s,o);n+=r.headerGap?(8+14)/u:0;n+=r.required?parseFloat(a.get({name:"sapMFontLargeSize"}))+.125:0}l=Math.max(o,l,n);l=Math.min(l,s);l=Math.round(l*100)/100;return l+r.padding+"rem"};i.getNoColumnsIllustratedMessage=function(a){var i=t.getLibraryResourceBundle("sap.m");var o=new r({illustrationType:e.IllustratedMessageType.AddColumn,title:i.getText("TABLE_NO_COLUMNS_TITLE"),description:i.getText("TABLE_NO_COLUMNS_DESCRIPTION")});if(a){var u=new n({icon:"sap-icon://action-settings",press:a});o.addAdditionalContent(u)}return o};i.getSelectAllPopover=function(){if(l){return l}l=Promise.all([new Promise(function(e){sap.ui.require(["sap/m/Popover","sap/m/Bar","sap/m/HBox","sap/m/Title","sap/ui/core/library","sap/m/Text"],function(t,a,r,n,i,o){e({Popover:t,Bar:a,HBox:r,Title:n,coreLib:i,Text:o})})}),t.getLibraryResourceBundle("sap.m",true)]).then(function(e){var t=e[0];var a=e[1];var r=t.coreLib.IconColor.Critical,n=t.coreLib.TitleLevel.H2;s=new t.Popover({customHeader:new t.Bar({contentMiddle:[new t.HBox({items:[new t.coreLib.Icon({src:"sap-icon://message-warning",color:r}).addStyleClass("sapUiTinyMarginEnd"),new t.Title({text:a.getText("TABLE_SELECT_LIMIT_TITLE"),level:n})],renderType:"Bare",justifyContent:"Center",alignItems:"Center"})]}),content:[new t.Text]}).addStyleClass("sapUiContentPadding");return{oSelectAllNotificationPopover:s,oResourceBundle:a}});return l};i.showSelectionLimitPopover=function(e,t){i.getSelectAllPopover().then(function(a){var r=a.oSelectAllNotificationPopover;var n=a.oResourceBundle;var i=n.getText("TABLE_SELECT_LIMIT",[e]);r.getContent()[0].setText(i);if(t){r.openBy(t)}})};i.hideSelectionLimitPopover=function(){if(s&&s.isOpen()){s.close()}};return i});