/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./UniversalDate","../CalendarType","./_Calendars"],function(e,t,a){"use strict";var n=e.extend("sap.ui.core.date.Japanese",{constructor:function(){var e=arguments;if(e.length>1){e=i(e)}this.oDate=this.createDate(Date,e);this.sCalendarType=t.Japanese}});n.UTC=function(){var e=i(arguments);return Date.UTC.apply(Date,e)};n.now=function(){return Date.now()};function r(a){var n=e.getEraByDate(t.Japanese,a.year,a.month,a.day),r=e.getEraStartDate(t.Japanese,n).year;return{era:n,year:a.year-r+1,month:a.month,day:a.day}}function o(a){var n=e.getEraStartDate(t.Japanese,a.era).year;return{year:n+a.year-1,month:a.month,day:a.day}}function i(a){var n,r,i,s=a[0];if(typeof s=="number"){if(s>=100){return a}else{i=e.getCurrentEra(t.Japanese);s=[i,s]}}else if(!Array.isArray(s)){s=[]}n={era:s[0],year:s[1],month:a[1],day:a[2]!==undefined?a[2]:1};r=o(n);a[0]=r.year;return a}n.prototype._getJapanese=function(){var e={year:this.oDate.getFullYear(),month:this.oDate.getMonth(),day:this.oDate.getDate()};return r(e)};n.prototype._setJapanese=function(e){var t=o(e);return this.oDate.setFullYear(t.year,t.month,t.day)};n.prototype._getUTCJapanese=function(){var e={year:this.oDate.getUTCFullYear(),month:this.oDate.getUTCMonth(),day:this.oDate.getUTCDate()};return r(e)};n.prototype._setUTCJapanese=function(e){var t=o(e);return this.oDate.setUTCFullYear(t.year,t.month,t.day)};n.prototype.getYear=function(){return this._getJapanese().year};n.prototype.getFullYear=function(){return this._getJapanese().year};n.prototype.getEra=function(){return this._getJapanese().era};n.prototype.getUTCFullYear=function(){return this._getUTCJapanese().year};n.prototype.getUTCEra=function(){return this._getUTCJapanese().era};n.prototype.setYear=function(e){var t=this._getJapanese();t.year=e;return this._setJapanese(t)};n.prototype.setFullYear=function(e,t,a){var n=this._getJapanese();n.year=e;if(t!==undefined){n.month=t}if(a!==undefined){n.day=a}return this._setJapanese(n)};n.prototype.setEra=function(a,n,o,i){var s=e.getEraStartDate(t.Japanese,a),u=r(s);if(n!==undefined){u.year=n}if(o!==undefined){u.month=o}if(i!==undefined){u.day=i}return this._setJapanese(u)};n.prototype.setUTCFullYear=function(e,t,a){var n=this._getUTCJapanese();n.year=e;if(t!==undefined){n.month=t}if(a!==undefined){n.day=a}return this._setUTCJapanese(n)};n.prototype.setUTCEra=function(a,n,o,i){var s=e.getEraStartDate(t.Japanese,a),u=r(s);if(n!==undefined){u.year=n}if(o!==undefined){u.month=o}if(i!==undefined){u.day=i}return this._setUTCJapanese(u)};n.prototype.getWeek=function(t,a){return e.getWeekByDate(this.sCalendarType,this.oDate.getFullYear(),this.getMonth(),this.getDate(),t,a)};n.prototype.getUTCWeek=function(t,a){return e.getWeekByDate(this.sCalendarType,this.oDate.getUTCFullYear(),this.getUTCMonth(),this.getUTCDate(),t,a)};a.set(t.Japanese,n);return n});