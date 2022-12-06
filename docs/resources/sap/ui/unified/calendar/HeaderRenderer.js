/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Configuration"],function(t){"use strict";var e=5;var a={apiVersion:2};a.render=function(a,i){var n=t.getLocale().getLanguage();var s=i.getTooltip_AsString();var l=i.getId();var o=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var r=o.getText("CALENDAR_BTN_NEXT");var u=o.getText("CALENDAR_BTN_PREV");var d=o.getText("CALENDAR_BTN_TODAY");a.openStart("div",i);a.class("sapUiCalHead");if(i.getVisibleCurrentDateButton()){a.class("sapUiCalHeaderWithTodayButton")}if(s){a.attr("title",s)}a.accessibilityState(i);a.openEnd();a.openStart("button",l+"-prev");a.attr("title",u);a.accessibilityState(null,{label:u});a.class("sapUiCalHeadPrev");if(!i.getEnabledPrevious()){a.class("sapUiCalDsbl");a.attr("disabled","disabled")}a.attr("tabindex","-1");a.openEnd();a.icon("sap-icon://slim-arrow-left",null,{title:null});a.close("button");var c=-1;var b=-1;var g=0;var B;for(g=0;g<e;g++){if(this.getVisibleButton(i,g)){if(c<0){c=g}b=g}}for(g=0;g<e;g++){if(n.toLowerCase()==="ja"||n.toLowerCase()==="zh"){B=e-1-g;if(this._isTwoMonthsCalendar(i)){switch(g){case 0:B=2;break;case 2:B=4;break;case 1:B=1;break;case 3:B=3;break}}}else{B=g}if(this._isTwoMonthsCalendar(i)){c=2;b=3}this.renderCalendarButtons(a,i,l,c,b,B)}if(!i.getVisibleButton0()&&!i.getVisibleButton1()&&!i.getVisibleButton2()&&!i._getVisibleButton3()&&!i._getVisibleButton4()){a.openStart("div",l+"-B"+"-Placeholder");a.class("sapUiCalHeadBPlaceholder");a.openEnd();a.close("span")}a.openStart("button",l+"-next");a.attr("title",r);a.accessibilityState(null,{label:r});a.class("sapUiCalHeadNext");if(!i.getEnabledNext()){a.class("sapUiCalDsbl");a.attr("disabled","disabled")}a.attr("tabindex","-1");a.openEnd();a.icon("sap-icon://slim-arrow-right",null,{title:null});a.close("button");if(i.getVisibleCurrentDateButton()){a.openStart("button",l+"-today");a.attr("title",d);a.accessibilityState(null,{label:d});a.class("sapUiCalHeadB");a.class("sapUiCalHeadToday");a.openEnd();a.icon("sap-icon://appointment",null,{title:null});a.close("button")}a.close("div")};a.renderCalendarButtons=function(t,e,a,i,n,s){var l={};if(this.getVisibleButton(e,s)){t.openStart("button",a+"-B"+s);t.class("sapUiCalHeadB");t.class("sapUiCalHeadB"+s);if(i===s){t.class("sapUiCalHeadBFirst")}if(n===s){t.class("sapUiCalHeadBLast")}if(s===3||s==4){t.attr("tabindex","-1")}if(this.getAriaLabelButton(e,s)){l["label"]=this.getAriaLabelButton(e,s)}t.accessibilityState(null,l);l={};t.openEnd();var o=this.getTextButton(e,s)||"";var r=this.getAdditionalTextButton(e,s)||"";if(r){t.openStart("span",a+"-B"+s+"-Text");t.class("sapUiCalHeadBText");t.openEnd();t.text(o);t.close("span");t.openStart("span",a+"-B"+s+"-AddText");t.class("sapUiCalHeadBAddText");t.openEnd();t.text(r);t.close("span")}else{t.text(o)}t.close("button")}};a.getVisibleButton=function(t,e){var a=false;if(t["getVisibleButton"+e]){a=t["getVisibleButton"+e]()}else if(t["_getVisibleButton"+e]){a=t["_getVisibleButton"+e]()}return a};a.getAriaLabelButton=function(t,e){var a;if(t["getAriaLabelButton"+e]){a=t["getAriaLabelButton"+e]()}else if(t["_getAriaLabelButton"+e]){a=t["_getAriaLabelButton"+e]()}return a};a.getTextButton=function(t,e){var a;if(t["getTextButton"+e]){a=t["getTextButton"+e]()}else if(t["_getTextButton"+e]){a=t["_getTextButton"+e]()}return a};a.getAdditionalTextButton=function(t,e){var a;if(t["getAdditionalTextButton"+e]){a=t["getAdditionalTextButton"+e]()}else if(t["_getAdditionalTextButton"+e]){a=t["_getAdditionalTextButton"+e]()}return a};a._isTwoMonthsCalendar=function(t){return t.getParent()instanceof sap.ui.unified.Calendar&&t.getParent().getMonths()>=2};return a},true);