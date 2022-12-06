/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./InputBase","./DatePicker","sap/ui/model/type/Date","./library","sap/ui/core/library","sap/ui/core/Control","sap/ui/Device","sap/ui/core/format/DateFormat","sap/ui/core/LocaleData","sap/ui/core/Core","sap/ui/core/format/TimezoneUtil","./TimePickerClocks","./DateTimePickerRenderer","./SegmentedButton","./SegmentedButtonItem","./ResponsivePopover","./Button","sap/ui/core/IconPool","sap/ui/qunit/utils/waitForThemeApplied","sap/ui/core/Configuration","sap/ui/dom/jquery/cursorPos"],function(e,t,i,o,s,n,a,r,p,l,u,h,g,c,d,f,m,_,y,T,C){"use strict";var P=s.PlacementType,S=s.ButtonType,D="Phone";var v=i.extend("sap.m.DateTimePicker",{metadata:{library:"sap.m",properties:{minutesStep:{type:"int",group:"Misc",defaultValue:1},secondsStep:{type:"int",group:"Misc",defaultValue:1},showCurrentTimeButton:{type:"boolean",group:"Behavior",defaultValue:false},showTimezone:{type:"boolean",group:"Behavior"},timezone:{type:"string",group:"Data"}},designtime:"sap/m/designtime/DateTimePicker.designtime",dnd:{draggable:false,droppable:true}},constructor:function(e,t,o){var s;if(typeof e!=="string"&&e!==undefined){o=t;t=e;e=t&&t.id}s=t?Object.keys(t).sort(function(e,t){if(e==="timezone"){return-1}else if(t==="timezone"){return 1}return 0}).reduce(function(e,i){e[i]=t[i];return e},{}):t;i.call(this,e,s,o)},renderer:c});var z={Short:"short",Medium:"medium",Long:"long",Full:"full"};var w=a.extend("sap.m.internal.DateTimePickerPopup",{metadata:{library:"sap.m",properties:{forcePhoneView:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{_switcher:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},calendar:{type:"sap.ui.core.Control",multiple:false},clocks:{type:"sap.ui.core.Control",multiple:false}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.class("sapMDateTimePopupCont").class("sapMTimePickerDropDown");e.openEnd();var i=t.getAggregation("_switcher");if(i){e.openStart("div");e.class("sapMTimePickerSwitch");e.openEnd();e.renderControl(i);e.close("div")}var o=t.getCalendar();if(o){e.renderControl(o)}e.openStart("div");e.class("sapMTimePickerSep");e.openEnd();e.close("div");var s=t.getClocks();if(s){e.renderControl(s)}e.close("div")}},init:function(){},onBeforeRendering:function(){var t=this.getAggregation("_switcher");if(!t){var i=u.getLibraryResourceBundle("sap.m");var o=i.getText("DATETIMEPICKER_DATE");var s=i.getText("DATETIMEPICKER_TIME");t=new d(this.getId()+"-Switch",{selectedKey:"Cal",items:[new f(this.getId()+"-Switch-Cal",{key:"Cal",text:o}),new f(this.getId()+"-Switch-Clk",{key:"Clk",text:s})]});t.attachSelect(this._handleSelect,this);this.setAggregation("_switcher",t,true)}if(r.system.phone||e("html").hasClass("sapUiMedia-Std-Phone")||this.getForcePhoneView()){t.setVisible(true);t.setSelectedKey("Cal");this.getCalendar().attachSelect(function(){this._addCalendarDelegate()}.bind(this));this._addCalendarDelegate()}else{t.setVisible(false)}},_addCalendarDelegate:function(){var e=this.getAggregation("_switcher"),t={onAfterRendering:function(){this._switchVisibility(e.getSelectedKey());this.getCalendar().removeDelegate(t)}.bind(this)};this.getCalendar().addDelegate(t)},_handleSelect:function(e){var t=e.getParameter("key");this._switchVisibility(t);if(t==="Clk"){this.getClocks()._focusActiveButton()}},_switchVisibility:function(e){var t=this.getCalendar(),i=this.getClocks();if(!t||!i){return}if(e==="Cal"){t.$().css("display","flex");i.$().css("display","none");t.getFocusDomRef()&&t.getFocusDomRef().focus()}else{t.$().css("display","none");i.$().css("display","")}},switchToTime:function(){var e=this.getAggregation("_switcher");if(e&&e.getVisible()){e.setSelectedKey("Clk");this._switchVisibility("Clk")}},getSpecialDates:function(){return this._oDateTimePicker.getSpecialDates()}});v.prototype.init=function(){i.prototype.init.apply(this,arguments);this._bOnlyCalendar=false};v.prototype._formatValueAndUpdateOutput=function(e,t){delete this._prefferedValue;if(!this.getDomRef()){return}var i=e?this._formatValue(e):t;if(!e){var o=this._fallbackParse(t);if(typeof o==="string"){this._bValid=true;this._prefferedValue=o;i=o}}if(this._bPreferUserInteraction){this.handleInputValueConcurrency(i)}else if(this._$input.val()!==i){this._$input.val(i);this._curpos=this._$input.cursorPos()}};v.prototype.setTimezone=function(e){var t,i,o;if(this.getTimezone()===e){return this}t=this.getDateValue()||this._parseValue(this.getValue(),false);i=this._formatValue(t,false);this.setProperty("timezone",e);this._oDisplayFormat=null;this._oValueFormat=null;this._oDisplayFormatWithTimezone=null;this._oValueFormatWithTimezone=null;if(this._oTimezonePopup){this._oTimezonePopup.setTitle(this._getTranslatedTimezone(true))}o=this._parseValue(i,true);if(o){this.setProperty("dateValue",o);this.setProperty("value",this._formatValue(o,true))}return this};v.prototype.ontap=function(e){if(e.target.parentElement.classList.contains("sapMDTPTimezoneLabel")){this._togglePopoverOpen(this._getTimezoneNamePopup(),e.target);return}i.prototype.ontap.apply(this,arguments)};v.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.apply(this,arguments);if(this._getShowTimezone()){T().then(function(){var e=this.$().find(".sapMDummyContent"),t;if(!e||!e.length){return}t=e[0].getBoundingClientRect().width;this.$("inner").css("max-width",t+2+"px")}.bind(this))}};v.prototype.getIconSrc=function(){return y.getIconURI("date-time")};v.prototype.exit=function(){i.prototype.exit.apply(this,arguments);if(this._oClocks){this._oClocks.destroy();delete this._oClocks}this._oTimezonePopup=undefined;this._oPopupContent=undefined;r.media.detachHandler(this._handleWindowResize,this)};v.prototype.setDisplayFormat=function(e){this._oDisplayFormatWithTimezone=null;i.prototype.setDisplayFormat.apply(this,arguments);if(this._oClocks){this._oClocks.setValueFormat(B.call(this));this._oClocks.setDisplayFormat(B.call(this))}return this};v.prototype.setValueFormat=function(e){this._oValueFormatWithTimezone=null;return i.prototype.setValueFormat.apply(this,arguments)};v.prototype.setMinutesStep=function(e){this.setProperty("minutesStep",e,true);if(this._oClocks){this._oClocks.setMinutesStep(e)}return this};v.prototype._getDefaultValueStyle=function(){return z.Medium};v.prototype.setMinDate=function(e){i.prototype.setMinDate.call(this,e);if(e){this._oMinDate.setHours(e.getHours(),e.getMinutes(),e.getSeconds())}return this};v.prototype.setMaxDate=function(e){i.prototype.setMaxDate.call(this,e);if(e){this._oMaxDate.setHours(e.getHours(),e.getMinutes(),e.getSeconds())}return this};v.prototype.setSecondsStep=function(e){this.setProperty("secondsStep",e,true);if(this._oClocks){this._oClocks.setSecondsStep(e)}return this};v.prototype.setShowCurrentTimeButton=function(e){var t=this._oClocks;t&&t.setShowCurrentTimeButton(e);return this.setProperty("showCurrentTimeButton",e)};v.prototype._getTimezoneNamePopup=function(){var e;if(this._oTimezonePopup){this._oTimezonePopup.setTitle(this._getTranslatedTimezone(true));return this._oTimezonePopup}this._oTimezonePopup=new m({showArrow:false,placement:P.VerticalPreferredBottom,offsetX:0,offsetY:3,horizontalScrolling:false,title:this._getTimezone(true)});this.addDependent(this._oTimezonePopup);if(r.system.phone){e=u.getLibraryResourceBundle("sap.m");this._oTimezonePopup.setEndButton(new _({text:e.getText("SUGGESTIONSPOPOVER_CLOSE_BUTTON"),type:S.Emphasized,press:function(){this._oTimezonePopup.close()}.bind(this)}))}return this._oTimezonePopup};v.prototype._togglePopoverOpen=function(e,t){if(e.isOpen()){e.close()}else{e.openBy(t||this.getDomRef())}};v.prototype._getFormatter=function(e){var t=this._getTimezoneFormatterCacheName(e);if(!this[t]){this[t]=p.getDateTimeWithTimezoneInstance(this._getTimezoneFormatOptions(e))}return this[t]};v.prototype._getBindingFormatOptions=function(){var t=this.getBinding("value")||this.getBinding("dateValue"),i;if(t){i=t.getType()}if(this._isSupportedBindingType(i)){return e.extend({},i.getFormatOptions())}};v.prototype._getTimezoneFormatOptions=function(e){var t=this._getBindingFormatOptions()||{},i=e?this.getDisplayFormat():this.getValueFormat(),o=this.getBinding("value")||this.getBinding("dateValue"),s=o&&o.getType&&o.getType();if(e||!this._getTimezone()||s&&!s.isA(["sap.ui.model.odata.type.DateTimeWithTimezone"])){t.showTimezone=false}if(t.relative===undefined){t.relative=false}if(t.calendarType===undefined){t.calendarType=e?this.getDisplayFormatType():C.getCalendarType()}if(t.strictParsing===undefined){t.strictParsing=true}if(i&&!this._isSupportedBindingType(s)){t[this._checkStyle(i)?"style":"pattern"]=i}return t};v.prototype._getTimezoneFormatterCacheName=function(e){return e?"_oDisplayFormatWithTimezone":"_oValueFormatWithTimezone"};v.prototype._getShowTimezone=function(){var e=this.getBinding("value")||this.getBinding("dateValue"),t=e&&e.getType();if(this.getShowTimezone()===undefined&&t&&t.isA(["sap.ui.model.odata.type.DateTimeWithTimezone"])){return t.getFormatOptions().showTimezone!==false}return this.getShowTimezone()};v.prototype._getTimezone=function(e){var t=this.getBinding("value")||this.getBinding("dateValue"),i=t&&t.getType();if(!this.getTimezone()&&i&&i.isA(["sap.ui.model.odata.type.DateTimeWithTimezone"])&&t.aValues[1]){return t.aValues[1]}return this.getTimezone()||e&&u.getConfiguration().getTimezone()};v.prototype._getTranslatedTimezone=function(e){return l.getInstance(u.getConfiguration().getFormatSettings().getFormatLocale()).getTimezoneTranslations()[this._getTimezone(e)]};v.prototype._checkStyle=function(e){if(i.prototype._checkStyle.apply(this,arguments)){return true}else if(e.indexOf("/")>0){var t=[z.Short,z.Medium,z.Long,z.Long];var o=false;for(var s=0;s<t.length;s++){var n=t[s];for(var a=0;a<t.length;a++){var r=t[a];if(e==n+"/"+r){o=true;break}}if(o){break}}return o}return false};v.prototype._parseValue=function(e,t,i){var o=this.getBinding("value")||this.getBinding("dateValue"),s=o&&o.getType(),n;if(s&&s.isA(["sap.ui.model.odata.type.DateTimeWithTimezone"])){var a=o.getCurrentValues().slice(0);a[1]=i||this._getTimezone(true);return s.parseValue(e,"string",a)[0]}n=this._getFormatter(t).parse(e,i||this._getTimezone(true));if(!n||!n.length){return null}return n[0]};v.prototype._formatValue=function(e,t,i){if(!e){return""}return this._getFormatter(!t).format(e,i||this._getTimezone(true))};v.prototype._fallbackParse=function(e){return this._getFallbackParser().parse(e)?"":null};v.prototype._getFallbackParser=function(){if(!this._fallbackParser){this._fallbackParser=p.getDateTimeWithTimezoneInstance({showDate:false,showTime:false,showTimezone:true})}return this._fallbackParser};v.prototype._getPickerParser=function(){if(!this._clocksParser){this._clocksParser=p.getDateTimeWithTimezoneInstance({showTimezone:false,calendarType:this.getDisplayFormatType()})}return this._clocksParser};v.prototype._getLocaleBasedPattern=function(e){var t=l.getInstance(u.getConfiguration().getFormatSettings().getFormatLocale()),i=e.indexOf("/");if(i>0){return t.getCombinedDateTimePattern(e.substr(0,i),e.substr(i+1))}else{return t.getCombinedDateTimePattern(e,e)}};v.prototype._createPopup=function(){var e,t,i,o,s,n;if(!this._oPopup){i=u.getLibraryResourceBundle("sap.m");o=i.getText("TIMEPICKER_SET");s=i.getText("TIMEPICKER_CANCEL");this._oPopupContent=new w(this.getId()+"-PC");this._oPopupContent._oDateTimePicker=this;this._oOKButton=new _(this.getId()+"-OK",{text:o,type:S.Emphasized,press:k.bind(this)});var a=this._getValueStateHeader();this._oPopup=new m(this.getId()+"-RP",{showCloseButton:false,showHeader:false,placement:P.VerticalPreferedBottom,beginButton:this._oOKButton,content:[a,this._oPopupContent],afterOpen:b.bind(this),afterClose:F.bind(this)});a.setPopup(this._oPopup._oControl);if(r.system.phone){e=this.$("inner").attr("aria-labelledby");t=e?document.getElementById(e).textContent:"";this._oPopup.setTitle(t);this._oPopup.setShowHeader(true);this._oPopup.setShowCloseButton(true)}else{this._oPopup._getPopup().setDurations(0,0);this._oPopup.setEndButton(new _(this.getId()+"-Cancel",{text:s,press:V.bind(this)}))}this._oPopup.addStyleClass("sapMDateTimePopup");n=this._oPopup.getAggregation("_popup");if(n.setShowArrow){n.setShowArrow(false)}this.setAggregation("_popup",this._oPopup,true)}};v.prototype._openPopup=function(e){if(!this._oPopup){return}if(!e){e=this.getDomRef()}this.addStyleClass(t.ICON_PRESSED_CSS_CLASS);var i=this._oPopup.getAggregation("_popup");i.oPopup.setExtraContent([e]);this._oPopup.openBy(e||this)};v.prototype._createPopupContent=function(){var e=!this._oCalendar;i.prototype._createPopupContent.apply(this,arguments);if(e){this._oPopupContent.setCalendar(this._oCalendar);this._oCalendar.attachSelect(A,this)}if(!this._oClocks){this._oClocks=new g(this.getId()+"-Clocks",{minutesStep:this.getMinutesStep(),secondsStep:this.getSecondsStep(),valueFormat:B.call(this),displayFormat:B.call(this),localeId:this.getLocaleId(),showCurrentTimeButton:this.getShowCurrentTimeButton()});this._oPopupContent.setClocks(this._oClocks)}};v.prototype._attachAfterRenderingDelegate=function(){};v.prototype._selectFocusedDateValue=function(e){var t=this._oCalendar;t.removeAllSelectedDates();t.addSelectedDate(e);return this};v.prototype._fillDateRange=function(){var e=this.getDateValue(),t=true,i;if(e){e=new Date(e.getTime());this._oOKButton.setEnabled(true)}else{t=false;e=this.getInitialFocusedDateValue();if(!e){e=new Date;this._oCalendar.removeAllSelectedDates()}var o=this._oMaxDate.getTime();if(e.getTime()<this._oMinDate.getTime()||e.getTime()>o){e=this._oMinDate}this._oOKButton.setEnabled(false)}i=this._getPickerParser().format(e,this._getTimezone(true));e=this._getPickerParser().parse(i,h.getLocalTimezone())[0];this._oCalendar.focusDate(e);if(t){if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=e.getTime()){this._oDateRange.setStartDate(e)}}this._oClocks._setTimeValues(e)};v.prototype._getSelectedDate=function(){var e=i.prototype._getSelectedDate.apply(this,arguments),t,o;if(e){t=this._oClocks.getTimeValues();o=this._oClocks._getDisplayFormatPattern();if(o.search("h")>=0||o.search("H")>=0){e.setHours(t.getHours())}if(o.search("m")>=0){e.setMinutes(t.getMinutes())}if(o.search("s")>=0){e.setSeconds(t.getSeconds())}if(e.getTime()<this._oMinDate.getTime()){e=new Date(this._oMinDate.getTime())}else if(e.getTime()>this._oMaxDate.getTime()){e=new Date(this._oMaxDate.getTime())}}return e};v.prototype.getLocaleId=function(){return u.getConfiguration().getFormatSettings().getFormatLocale().toString()};v.prototype.getAccessibilityInfo=function(){var e=i.prototype.getAccessibilityInfo.apply(this,arguments);e.type=u.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATETIMEINPUT");return e};function k(e){this._handleCalendarSelect()}function V(e){this.onsaphide(e);if(!this.getDateValue()){this._oCalendar.removeAllSelectedDates()}}v.prototype._handleWindowResize=function(e){var t=this.getAggregation("_popup").getContent()[1].getAggregation("_switcher"),i=this.getAggregation("_popup").getContent()[1].getCalendar(),o=this.getAggregation("_popup").getContent()[1].getClocks();if(e.name===D){t.setVisible(true);this.getAggregation("_popup").getContent()[1]._switchVisibility(t.getSelectedKey())}else{t.setVisible(false);o.$().css("display","");i.$().css("display","flex")}};function b(e){this._oCalendar.focus();r.media.attachHandler(this._handleWindowResize,this);this.fireAfterValueHelpOpen()}function F(){this.removeStyleClass(t.ICON_PRESSED_CSS_CLASS);this._oCalendar._closePickers();r.media.detachHandler(this._handleWindowResize,this);this.fireAfterValueHelpClose()}function B(){var e=this.getDisplayFormat();var t;var i=this.getBinding("value");if(i&&i.oType&&i.oType instanceof o){e=i.oType.getOutputPattern()}else if(i&&i.oType&&i.oType.oFormat){e=i.oType.oFormat.oFormatOptions.pattern}else{e=this.getDisplayFormat()}if(!e){e=z.Medium}var s=e.indexOf("/");if(s>0&&this._checkStyle(e)){e=e.substr(s+1)}if(e==z.Short||e==z.Medium||e==z.Long||e==z.Full){var n=u.getConfiguration().getFormatSettings().getFormatLocale();var a=l.getInstance(n);t=a.getTimePattern(e)}else{t=e}return t}function A(e){this._oPopupContent.switchToTime();this._oPopupContent.getClocks()._focusActiveButton();this._oOKButton.setEnabled(true)}return v});