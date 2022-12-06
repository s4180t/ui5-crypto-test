/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/base/Log","sap/base/assert","sap/base/util/extend","sap/ui/core/Configuration"],function(e,r,t,i,n,a,o){"use strict";var s=e.extend("sap.ui.core.format.NumberFormat",{constructor:function(e){throw new Error}});var u=/0+(\.0+)?/;var c=/^0+$/;var l=function(){return/^(?:\d{1,2},?\d{2},?\d{3}|\d{1,2},?\d{3}|\d{1,3})(?:,?\d{2},?\d{2},?\d{3})*$/};var g=function(e,r,t){var i=O(e);return new RegExp("^\\d+"+"(?:"+i+"?"+"\\d{"+r+"}"+")*"+""+i+"?"+"\\d{"+t+"}"+"$")};var f={INTEGER:"integer",FLOAT:"float",CURRENCY:"currency",UNIT:"unit",PERCENT:"percent"};var m={FLOOR:"FLOOR",CEILING:"CEILING",TOWARDS_ZERO:"TOWARDS_ZERO",AWAY_FROM_ZERO:"AWAY_FROM_ZERO",HALF_FLOOR:"HALF_FLOOR",HALF_CEILING:"HALF_CEILING",HALF_TOWARDS_ZERO:"HALF_TOWARDS_ZERO",HALF_AWAY_FROM_ZERO:"HALF_AWAY_FROM_ZERO"};var d={};d[m.FLOOR]=Math.floor;d[m.CEILING]=Math.ceil;d[m.TOWARDS_ZERO]=function(e){return e>0?Math.floor(e):Math.ceil(e)};d[m.AWAY_FROM_ZERO]=function(e){return e>0?Math.ceil(e):Math.floor(e)};d[m.HALF_TOWARDS_ZERO]=function(e){return e>0?Math.ceil(e-.5):Math.floor(e+.5)};d[m.HALF_AWAY_FROM_ZERO]=function(e){return e>0?Math.floor(e+.5):Math.ceil(e-.5)};d[m.HALF_FLOOR]=function(e){return Math.ceil(e-.5)};d[m.HALF_CEILING]=Math.round;s.RoundingMode=m;s.oDefaultIntegerFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:0,strictGroupingValidation:false,groupingEnabled:false,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:true,type:f.INTEGER,showMeasure:false,style:"standard",showNumber:true,parseAsString:false,preserveDecimals:false,roundingMode:s.RoundingMode.TOWARDS_ZERO,emptyString:NaN,showScale:true};s.oDefaultFloatFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,strictGroupingValidation:false,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:f.FLOAT,showMeasure:false,style:"standard",showNumber:true,parseAsString:false,preserveDecimals:false,roundingMode:s.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};s.oDefaultPercentFormat={minIntegerDigits:1,maxIntegerDigits:99,minFractionDigits:0,maxFractionDigits:99,strictGroupingValidation:false,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",percentSign:"%",isInteger:false,type:f.PERCENT,showMeasure:false,style:"standard",showNumber:true,parseAsString:false,preserveDecimals:false,roundingMode:s.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};s.oDefaultCurrencyFormat={minIntegerDigits:1,maxIntegerDigits:99,strictGroupingValidation:false,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:f.CURRENCY,showMeasure:true,currencyCode:true,currencyContext:"standard",style:"standard",showNumber:true,customCurrencies:undefined,parseAsString:false,preserveDecimals:false,roundingMode:s.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true,ignorePrecision:true};s.oDefaultUnitFormat={minIntegerDigits:1,maxIntegerDigits:99,strictGroupingValidation:false,groupingEnabled:true,groupingSize:3,groupingSeparator:",",decimalSeparator:".",plusSign:"+",minusSign:"-",isInteger:false,type:f.UNIT,showMeasure:true,style:"standard",showNumber:true,customUnits:undefined,allowedUnits:undefined,parseAsString:false,preserveDecimals:false,roundingMode:s.RoundingMode.HALF_AWAY_FROM_ZERO,emptyString:NaN,showScale:true};s.getInstance=function(e,r){return this.getFloatInstance(e,r)};s.getFloatInstance=function(e,r){var t=this.createInstance(e,r),i=this.getLocaleFormatOptions(t.oLocaleData,f.FLOAT);t.oFormatOptions=a({},this.oDefaultFloatFormat,i,t.oOriginalFormatOptions);return t};s.getIntegerInstance=function(e,r){var t=this.createInstance(e,r),i=this.getLocaleFormatOptions(t.oLocaleData,f.INTEGER);t.oFormatOptions=a({},this.oDefaultIntegerFormat,i,t.oOriginalFormatOptions);return t};s.getCurrencyInstance=function(e,r){var t=this.createInstance(e,r);var i=t.oOriginalFormatOptions&&t.oOriginalFormatOptions.currencyContext;var n=S(t.oOriginalFormatOptions);if(n){i=i||this.oDefaultCurrencyFormat.style;i="sap-"+i}var o=this.getLocaleFormatOptions(t.oLocaleData,f.CURRENCY,i);t.oFormatOptions=a({},this.oDefaultCurrencyFormat,o,t.oOriginalFormatOptions);t.oFormatOptions.trailingCurrencyCode=n;t._defineCustomCurrencySymbols();return t};s.getUnitInstance=function(e,r){var t=this.createInstance(e,r),i=this.getLocaleFormatOptions(t.oLocaleData,f.UNIT);t.oFormatOptions=a({},this.oDefaultUnitFormat,i,t.oOriginalFormatOptions);return t};s.getPercentInstance=function(e,r){var t=this.createInstance(e,r),i=this.getLocaleFormatOptions(t.oLocaleData,f.PERCENT);t.oFormatOptions=a({},this.oDefaultPercentFormat,i,t.oOriginalFormatOptions);return t};s.createInstance=function(e,i){var a=Object.create(this.prototype),s;if(e instanceof r){i=e;e=undefined}if(!i){i=o.getFormatSettings().getFormatLocale()}a.oLocale=i;a.oLocaleData=t.getInstance(i);a.oOriginalFormatOptions=e;if(e){if(e.pattern){s=this.parseNumberPattern(e.pattern);Object.keys(s).forEach(function(r){e[r]=s[r]})}if(e.emptyString!==undefined){n(e.emptyString===""||e.emptyString===0||e.emptyString===null||e.emptyString!==e.emptyString,"The format option 'emptyString' must be either 0, null or NaN")}}return a};s.getDefaultUnitPattern=function(e){return"{0} "+e};s.getLocaleFormatOptions=function(e,r,t){var i,n;switch(r){case f.PERCENT:n=e.getPercentPattern();break;case f.CURRENCY:n=e.getCurrencyPattern(t);break;case f.UNIT:n=e.getDecimalPattern();break;default:n=e.getDecimalPattern()}i=this.parseNumberPattern(n);i.plusSign=e.getNumberSymbol("plusSign");i.minusSign=e.getNumberSymbol("minusSign");i.decimalSeparator=e.getNumberSymbol("decimal");i.groupingSeparator=e.getNumberSymbol("group");i.percentSign=e.getNumberSymbol("percentSign");i.pattern=n;switch(r){case f.UNIT:case f.FLOAT:case f.PERCENT:i.minFractionDigits=0;i.maxFractionDigits=99;break;case f.INTEGER:i.minFractionDigits=0;i.maxFractionDigits=0;i.groupingEnabled=false;break;case f.CURRENCY:i.minFractionDigits=undefined;i.maxFractionDigits=undefined;break}return i};s.parseNumberPattern=function(e){var r=0,t=0,i=0,n=false,a=0,o=0,s=e.indexOf(";"),u={Integer:0,Fraction:1},c=u.Integer;if(s!==-1){e=e.substring(0,s)}for(var l=0;l<e.length;l++){var g=e[l];switch(g){case",":if(n){a=o;o=0}n=true;break;case".":c=u.Fraction;break;case"0":if(c===u.Integer){r++;if(n){o++}}else{t++;i++}break;case"#":if(c===u.Integer){if(n){o++}}else{i++}break}}if(!a){a=o;o=0}return{minIntegerDigits:r,minFractionDigits:t,maxFractionDigits:i,groupingEnabled:n,groupingSize:a,groupingBaseSize:o}};s.prototype._defineCustomCurrencySymbols=function(){var e=this.oFormatOptions;var r=this.oLocaleData.getCurrencySymbols();var t=function(e,r){var t=[];var n;for(var a in e){n=e[a];if(t.indexOf(n)===-1){t.push(n)}else if(n!==undefined){r[n]=true;i.error("Symbol '"+n+"' is defined multiple times in custom currencies.",undefined,"NumberFormat")}}};if(e.customCurrencies&&typeof e.customCurrencies==="object"){this.mKnownCurrencySymbols={};this.mKnownCurrencyCodes={};Object.keys(e.customCurrencies).forEach(function(t){if(e.customCurrencies[t].symbol){this.mKnownCurrencySymbols[t]=e.customCurrencies[t].symbol}else{var i=e.customCurrencies[t].isoCode;if(i){this.mKnownCurrencySymbols[t]=r[i]}}this.mKnownCurrencyCodes[t]=t}.bind(this))}else{this.mKnownCurrencySymbols=r;this.mKnownCurrencyCodes=this.oLocaleData.getCustomCurrencyCodes()}this.mDuplicatedSymbols={};t(this.mKnownCurrencySymbols,this.mDuplicatedSymbols)};function p(e,r){if(e.indexOf(".")>=0&&!F(e)&&e.endsWith("0")){var t=e.length-e.lastIndexOf(".")-1;var i=t-r;if(i>0){while(e.endsWith("0")&&i-- >0){e=e.substring(0,e.length-1)}if(e.endsWith(".")){e=e.substring(0,e.length-1)}}}return e}function h(e,r,t){var i;var n="";if(t){var a=[3,2,2],o,s=0;i=e.length;while(i>0){o=a[s%3];i-=o;if(s>0){n=r.groupingSeparator+n}if(i<0){o+=i;i=0}n=e.substr(i,o)+n;s++}}else{var u=e.length;var c=r.groupingSize;var l=r.groupingBaseSize||c;i=Math.max(u-l,0)%c||c;n=e.substr(0,i);while(u-i>=l){n+=r.groupingSeparator;n+=e.substr(i,c);i+=c}n+=e.substr(i)}return n}s.prototype.format=function(e,r){if(Array.isArray(e)){r=e[1];e=e[0]}var t="",n="",a="",o="",u="",c="",l=e<0,g=-1,m=Object.assign({},this.oFormatOptions),d=this.oOriginalFormatOptions,y=m.type===f.CURRENCY&&r==="INR"&&this.oLocale.getLanguage()==="en"&&this.oLocale.getRegion()==="IN",S,F,D,O,N,R,I=e===undefined||e===null;if(m.groupingEnabled&&m.groupingSize<=0){i.error("Grouping requires the 'groupingSize' format option to be a positive number, but it is '"+m.groupingSize+"' instead.");return""}if(m.showNumber&&(e===m.emptyString||isNaN(e)&&isNaN(m.emptyString))){return""}if(r!==undefined&&r!==null&&typeof r!=="string"&&!(r instanceof String)){return""}if(!m.showNumber&&!r){return""}if(I&&(!r||!m.showMeasure||m.showNumber)){return""}if(r&&m.customCurrencies&&!m.customCurrencies[r]){i.error("Currency '"+r+"' is unknown.");return""}if(!m.showNumber&&!m.showMeasure){return""}if(r&&m.type===f.UNIT){if(m.customUnits&&typeof m.customUnits==="object"){N=m.customUnits[r]}else{R=this.oLocaleData.getUnitFromMapping(r)||r;N=this.oLocaleData.getUnitFormat(R)}if(m.showMeasure){var E=!m.allowedUnits||m.allowedUnits.indexOf(r)>=0;if(!E){return""}}if(!N&&!m.showNumber){return this._addOriginInfo(r)}m.decimals=N&&(typeof N.decimals==="number"&&N.decimals>=0)?N.decimals:m.decimals;m.precision=N&&(typeof N.precision==="number"&&N.precision>=0)?N.precision:m.precision}if(m.type==f.CURRENCY){if(r&&m.trailingCurrencyCode){if(!this.mKnownCurrencyCodes[r]&&!/(^[A-Z]{3}$)/.test(r)){m.trailingCurrencyCode=false;m.pattern=this.oLocaleData.getCurrencyPattern(m.currencyContext)}}if(!m.showNumber){if(!m.currencyCode){var w;if(m.customCurrencies&&typeof m.customCurrencies==="object"){w=this.mKnownCurrencySymbols[r]}else{w=this.oLocaleData.getCurrencySymbol(r)}if(w&&w!==r){r=w}}return r}if(m.customCurrencies&&m.customCurrencies[r]){m.decimals=m.customCurrencies[r].decimals!==undefined?m.customCurrencies[r].decimals:m.decimals}}if(m.decimals!==undefined){m.minFractionDigits=m.decimals;m.maxFractionDigits=m.decimals}if(m.shortLimit===undefined||Math.abs(e)>=m.shortLimit){D=m.shortRefNumber===undefined?e:m.shortRefNumber;F=C(D,m,this.oLocaleData,y);if(F&&F.formatString!="0"){e=e/F.magnitude;if(m.shortDecimals!==undefined){m.minFractionDigits=m.shortDecimals;m.maxFractionDigits=m.shortDecimals}else{if(d.minFractionDigits===undefined&&d.maxFractionDigits===undefined&&d.decimals===undefined&&d.precision===undefined&&d.pattern===undefined){m.precision=2;m.minFractionDigits=0;m.maxFractionDigits=99}if(d.maxFractionDigits===undefined&&d.decimals===undefined){m.maxFractionDigits=99}}m.roundingMode=s.RoundingMode.HALF_AWAY_FROM_ZERO}}if((F||!m.ignorePrecision)&&m.precision!==undefined){m.maxFractionDigits=Math.min(m.maxFractionDigits,L(e,m.precision));m.minFractionDigits=Math.min(m.minFractionDigits,m.maxFractionDigits)}if(m.type==f.PERCENT){e=s._shiftDecimalPoint(e,2)}if(m.type==f.CURRENCY){var A=this.oLocaleData.getCurrencyDigits(r);if(m.customCurrencies&&m.customCurrencies[r]&&m.customCurrencies[r].decimals!==undefined){A=m.customCurrencies[r].decimals}if(m.maxFractionDigits===undefined){m.maxFractionDigits=A}if(m.minFractionDigits===undefined){m.minFractionDigits=A}}if(typeof e==="number"&&!m.preserveDecimals){e=v(e,m.maxFractionDigits,m.roundingMode)}if(e==0){l=false}if(m.preserveDecimals&&(typeof e==="string"||e instanceof String)){e=p(e,m.maxFractionDigits)}if(!I){u=this.convertToDecimal(e)}if(u=="NaN"){return u}if(l){u=u.substr(1)}g=u.indexOf(".");if(g>-1){t=u.substr(0,g);n=u.substr(g+1)}else{t=u}if(t.length<m.minIntegerDigits){t=t.padStart(m.minIntegerDigits,"0")}else if(t.length>m.maxIntegerDigits){t="".padStart(m.maxIntegerDigits,"?")}if(n.length<m.minFractionDigits){n=n.padEnd(m.minFractionDigits,"0")}else if(n.length>m.maxFractionDigits&&!m.preserveDecimals){n=n.substr(0,m.maxFractionDigits)}if(m.type===f.UNIT&&!m.showNumber){if(N){O=this.oLocaleData.getPluralCategory(t+"."+n);c=N["unitPattern-count-"+O];if(!c){c=N["unitPattern-count-other"]}if(!c){return this._addOriginInfo(r)}if(O!=="other"&&c.indexOf("{0}")===-1){c=N["unitPattern-count-other"];if(!c){return this._addOriginInfo(r)}}if(c.indexOf("{0}")===-1){i.warning("Cannot separate the number from the unit because unitPattern-count-other '"+c+"' does not include the number placeholder '{0}' for unit '"+r+"'")}else{return this._addOriginInfo(c.replace("{0}","").trim())}}}if(m.groupingEnabled){a=h(t,m,y)}else{a=t}if(l){o=m.minusSign}o+=a;if(n){o+=m.decimalSeparator+n}if(F&&F.formatString&&m.showScale&&m.type!==f.CURRENCY){O=this.oLocaleData.getPluralCategory(t+"."+n);F.formatString=this.oLocaleData.getDecimalFormat(m.style,F.key,O);o=F.formatString.replace(F.valueSubString,o);o=o.replace(/'.'/g,".")}if(m.type===f.CURRENCY){c=m.pattern;if(F&&F.formatString&&m.showScale){var _;if(m.trailingCurrencyCode){_="sap-short"}else{_="short"}O=this.oLocaleData.getPluralCategory(t+"."+n);if(y){c=b(_,F.key,O)}else{c=this.oLocaleData.getCurrencyFormat(_,F.key,O)}c=c.replace(/'.'/g,".")}S=c.split(";");if(S.length===2){c=l?S[1]:S[0];if(l){o=o.substring(m.minusSign.length)}}if(!m.currencyCode){var w;if(m.customCurrencies&&typeof m.customCurrencies==="object"){w=this.mKnownCurrencySymbols[r]}else{w=this.oLocaleData.getCurrencySymbol(r)}if(w&&w!==r){r=w}}o=this._composeCurrencyResult(c,o,r,{showMeasure:m.showMeasure,negative:l,minusSign:m.minusSign})}if(m.type===f.PERCENT){c=m.pattern;o=c.replace(/[0#.,]+/,o);o=o.replace(/%/,m.percentSign)}if(m.showMeasure&&r&&m.type===f.UNIT){O=this.oLocaleData.getPluralCategory(t+"."+n);if(N){c=N["unitPattern-count-"+O];if(!c){c=N["unitPattern-count-other"]}if(!c){c=s.getDefaultUnitPattern(r)}}else{c=s.getDefaultUnitPattern(r)}o=c.replace("{0}",o)}return this._addOriginInfo(o)};s.prototype._addOriginInfo=function(e){if(o.getOriginInfo()){e=new String(e);e.originInfo={source:"Common Locale Data Repository",locale:this.oLocale.toString()}}return e};s.prototype._composeCurrencyResult=function(e,r,t,i){var n=i.minusSign;e=e.replace(/[0#.,]+/,r);if(i.showMeasure&&t){var a="¤",o={"[:digit:]":/\d/,"[:^S:]":/[^\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/},s=e.indexOf(a),u=s<e.length/2?"after":"before",c=this.oLocaleData.getCurrencySpacing(u),l=u==="after"?t.charAt(t.length-1):t.charAt(0),g,f=o[c.currencyMatch],m=o[c.surroundingMatch],d;e=e.replace(a,t);g=u==="after"?e.charAt(s+t.length):e.charAt(s-1);if(f&&f.test(l)&&m&&m.test(g)){if(u==="after"){d=s+t.length}else{d=s}e=e.slice(0,d)+c.insertBetween+e.slice(d)}else if(i.negative&&u==="after"){n="\ufeff"+i.minusSign}}else{e=e.replace(/\s*\u00a4\s*/,"")}if(i.negative){e=e.replace(/-/,n)}return e};s.prototype.parse=function(e){var r=this.oFormatOptions,t=r.plusSign+this.oLocaleData.getLenientNumberSymbols("plusSign"),a=r.minusSign+this.oLocaleData.getLenientNumberSymbols("minusSign"),o=O(t+a),u=O(r.groupingSeparator),c=O(r.decimalSeparator),l="^\\s*(["+o+"]?(?:[0-9"+u+"]+|[0-9"+u+"]*"+c+"[0-9]*)(?:[eE][+-][0-9]+)?)\\s*$",g="^\\s*(["+o+"]?[0-9"+u+"]+)\\s*$",m=new RegExp(u,"g"),d=new RegExp(c,"g"),p=this.oLocaleData.getNumberSymbol("percentSign"),h=r.type===f.CURRENCY&&this.oLocale.getLanguage()==="en"&&this.oLocale.getRegion()==="IN",C,S,b,v,L=0,R,E;if(e===""){if(!r.showNumber){return null}E=r.emptyString;if(r.parseAsString&&(r.emptyString===0||isNaN(r.emptyString))){E=r.emptyString+""}if(r.type===f.CURRENCY||r.type===f.UNIT){return[E,undefined]}else{return E}}if(typeof e!=="string"&&!(e instanceof String)){return null}if(r.groupingSeparator===r.decimalSeparator){i.error("The grouping and decimal separator both have the same value '"+r.groupingSeparator+"'. "+"They must be different from each other such that values can be parsed correctly.")}v=r.type===f.PERCENT?r.pattern:this.oLocaleData.getPercentPattern();if(v.charAt(0)==="%"){l=l.slice(0,1)+"%?"+l.slice(1)}else if(v.charAt(v.length-1)==="%"){l=l.slice(0,l.length-1)+"%?"+l.slice(l.length-1)}var w;if(r.type===f.UNIT&&r.showMeasure){var A;if(r.customUnits&&typeof r.customUnits==="object"){A=r.customUnits}else{A=this.oLocaleData.getUnitFormats()}n(A,"Unit patterns cannot be loaded");if(r.allowedUnits){var _={};for(var M=0;M<r.allowedUnits.length;M++){var x=r.allowedUnits[M];_[x]=A[x]}A=_}var U=N(A,e,r.showNumber,this.oLocaleData.sCLDRLocaleId);var P=false;w=U.cldrCode;if(w.length===1){b=w[0];if(!r.showNumber){return[undefined,b]}}else if(w.length===0){if(r.unitOptional){U.numberValue=e}else{return null}}else{n(w.length===1,"Ambiguous unit ["+w.join(", ")+"] for input: '"+e+"'");b=undefined;P=true}if(r.strictParsing){if(P){return null}}e=U.numberValue||e}var T;if(r.type===f.CURRENCY&&r.showMeasure){T=I({value:e,currencySymbols:this.mKnownCurrencySymbols,customCurrencyCodes:this.mKnownCurrencyCodes,duplicatedSymbols:this.mDuplicatedSymbols,customCurrenciesAvailable:!!r.customCurrencies});if(!T){return null}if(r.strictParsing){if(!T.currencyCode||T.duplicatedSymbolFound){return null}}e=T.numberValue;b=T.currencyCode;if(r.customCurrencies&&b===null){return null}if(!r.showNumber){if(e){return null}return[undefined,b]}}e=e.replace(/[\u202a\u200e\u202c\u202b\u200f]/g,"");e=e.replace(/\s/g,"");R=y(e,this.oLocaleData,h);if(R){e=R.number}var k=F(e);if(r.isInteger&&!R&&!k){C=new RegExp(g)}else{C=new RegExp(l)}if(!C.test(e)){return r.type===f.CURRENCY||r.type===f.UNIT?null:NaN}var W=e.length;for(var Y=0;Y<W;Y++){var z=e[Y];if(t.includes(z)){e=e.replace(z,"+");break}else if(a.includes(z)){e=e.replace(z,"-");break}}e=e.replace(/^\+/,"");if(!r.isInteger&&e.indexOf(p)!==-1){S=true;e=e.replace(p,"")}var G=e;e=e.replace(m,"");if(R){e=e.replace(d,".");e=s._shiftDecimalPoint(e,Math.round(Math.log(R.factor)/Math.LN10))}if(r.isInteger){var Z;if(k){e=e.replace(d,".");Z=D(e);if(Z===undefined){return NaN}}else{Z=parseInt(e)}L=r.parseAsString?e:Z}else{e=e.replace(d,".");L=r.parseAsString?e:parseFloat(e);if(S){L=s._shiftDecimalPoint(L,-2)}}var H=this._checkGrouping(G,r,k,h&&b==="INR");if(!H){return r.type===f.CURRENCY||r.type===f.UNIT?null:NaN}if(r.parseAsString&&!S){L=s._shiftDecimalPoint(e,0)}if(r.type===f.CURRENCY||r.type===f.UNIT){return[L,b]}return L};s.prototype.convertToDecimal=function(e){var r=""+e,t,i,n,a,o,s;if(r.indexOf("e")==-1&&r.indexOf("E")==-1){return r}var u=r.match(/^([+-]?)((\d+)(?:\.(\d+))?)[eE]([+-]?\d+)$/);t=u[1]=="-";i=u[2].replace(/\./g,"");n=u[3]?u[3].length:0;a=u[4]?u[4].length:0;o=parseInt(u[5]);if(o>0){if(o<a){s=n+o;r=i.substr(0,s)+"."+i.substr(s)}else{r=i;o-=a;for(var c=0;c<o;c++){r+="0"}}}else{if(-o<n){s=n+o;r=i.substr(0,s)+"."+i.substr(s)}else{r=i;o+=n;for(var c=0;c>o;c--){r="0"+r}r="0."+r}}if(t){r="-"+r}return r};s.prototype.getScale=function(){if(this.oFormatOptions.style!=="short"&&this.oFormatOptions.style!=="long"||this.oFormatOptions.shortRefNumber===undefined){return}var e=C(this.oFormatOptions.shortRefNumber,this.oFormatOptions,this.oLocaleData),r;if(e&&e.formatString){r=e.formatString.replace(u,"").replace(/'.'/g,".").trim();if(r){return r}}};s._shiftDecimalPoint=function(e,r){if(typeof r!=="number"){return NaN}var t="";var i=e.toString().toLowerCase().split("e");if(typeof e==="number"){r=i[1]?+i[1]+r:r;return+(i[0]+"e"+r)}else if(typeof e==="string"){if(parseFloat(e)===0&&r>=0){return c.test(e)?"0":e}var n=i[0].charAt(0);t=n==="-"?n:"";if(t){i[0]=i[0].slice(1)}e=i[0];var a=e.indexOf("."),o,s,u;if(a===-1){e=e+".";a=e.length-1}if(i[1]){a+=+i[1]}o=a+r;if(o<=0){e=e.padStart(e.length-o+1,"0");o=1}else if(o>=e.length-1){e=e.padEnd(o+1,"0");o=e.length-1}e=e.replace(".","");s=e.substring(0,o);u=e.substring(o);s=s.replace(/^(-?)0+(\d)/,"$1$2");return t+s+(u?"."+u:"")}else{return null}};function C(e,r,t,i){var n,a,o,s,c=r.style,l=r.precision!==undefined?r.precision:2;if(c!="short"&&c!="long"){return undefined}for(var g=0;g<15;g++){a=Math.pow(10,g);if(v(Math.abs(e)/a,l-1)<10){break}}o=a.toString();if(r.type===f.CURRENCY){if(r.trailingCurrencyCode){c="sap-short"}if(i){s=b(c,o,"other",true)}else{s=t.getCurrencyFormat(c,o,"other")}}else{s=t.getDecimalFormat(c,o,"other")}if(!s||s=="0"){return undefined}else{n={};n.key=o;n.formatString=s;var m=s.match(u);if(m){n.valueSubString=m[0];var d=n.valueSubString.indexOf(".");if(d==-1){n.decimals=0;n.magnitude=a*Math.pow(10,1-n.valueSubString.length)}else{n.decimals=n.valueSubString.length-d-1;n.magnitude=a*Math.pow(10,1-d)}}else{return undefined}}return n}function y(e,r,t){var i,n=1,a=10,o=r.getPluralCategories(),s,c={number:undefined,factor:n},l=function(t,a,o,l){if(l){s=b(o,a.toString(),t,true)}else{s=r.getDecimalFormat(o,a.toString(),t)}if(s){s=s.replace(/[\s\u00a0\u200F]/g,"");s=s.replace(/'.'/g,".");var g=s.match(u);if(g){var f=g[0];var m=s.replace(f,"");if(!m){return}var d=e.indexOf(m);if(d>=0){i=e.replace(m,"");i=i.replace(/\u200F/g,"");n=a;n*=Math.pow(10,1-f.length);if(c.number===undefined||i.length<c.number.length){c.number=i;c.factor=n}}}}};["long","short"].forEach(function(e){a=10;while(a<1e15){for(var r=0;r<o.length;r++){var t=o[r];l(t,a,e)}a=a*10}});if(t&&!i){a=10;while(a<1e15){for(var g=0;g<o.length;g++){var f=o[g];l(f,a,"short",true)}a=a*10}}if(!i){return}return c}function S(e){var r=o.getFormatSettings().getTrailingCurrencyCode();if(e){if(e.trailingCurrencyCode!==undefined){r=e.trailingCurrencyCode}if(e.pattern){r=false}if(e.currencyCode===false){r=false}}return r}function b(e,r,t,i){var n,a={short:{"1000-one":"¤0000","1000-other":"¤0000","10000-one":"¤00000","10000-other":"¤00000","100000-one":"¤0 Lk","100000-other":"¤0 Lk","1000000-one":"¤00 Lk","1000000-other":"¤00 Lk","10000000-one":"¤0 Cr","10000000-other":"¤0 Cr","100000000-one":"¤00 Cr","100000000-other":"¤00 Cr","1000000000-one":"¤000 Cr","1000000000-other":"¤000 Cr","10000000000-one":"¤0000 Cr","10000000000-other":"¤0000 Cr","100000000000-one":"¤00000 Cr","100000000000-other":"¤00000 Cr","1000000000000-one":"¤0 Lk Cr","1000000000000-other":"¤0 Lk Cr","10000000000000-one":"¤00 Lk Cr","10000000000000-other":"¤00 Lk Cr","100000000000000-one":"¤0 Cr Cr","100000000000000-other":"¤0 Cr Cr"},"sap-short":{"1000-one":"0000 ¤","1000-other":"0000 ¤","10000-one":"00000 ¤","10000-other":"00000 ¤","100000-one":"0 Lk ¤","100000-other":"0 Lk ¤","1000000-one":"00 Lk ¤","1000000-other":"00 Lk ¤","10000000-one":"0 Cr ¤","10000000-other":"0 Cr ¤","100000000-one":"00 Cr ¤","100000000-other":"00 Cr ¤","1000000000-one":"000 Cr ¤","1000000000-other":"000 Cr ¤","10000000000-one":"0000 Cr ¤","10000000000-other":"0000 Cr ¤","100000000000-one":"00000 Cr ¤","100000000000-other":"00000 Cr ¤","1000000000000-one":"0 Lk Cr ¤","1000000000000-other":"0 Lk Cr ¤","10000000000000-one":"00 Lk Cr ¤","10000000000000-other":"00 Lk Cr ¤","100000000000000-one":"0 Cr Cr ¤","100000000000000-other":"0 Cr Cr ¤"}},o={short:{"1000-one":"0000","1000-other":"0000","10000-one":"00000","10000-other":"00000","100000-one":"0 Lk","100000-other":"0 Lk","1000000-one":"00 Lk","1000000-other":"00 Lk","10000000-one":"0 Cr","10000000-other":"0 Cr","100000000-one":"00 Cr","100000000-other":"00 Cr","1000000000-one":"000 Cr","1000000000-other":"000 Cr","10000000000-one":"0000 Cr","10000000000-other":"0000 Cr","100000000000-one":"00000 Cr","100000000000-other":"00000 Cr","1000000000000-one":"0 Lk Cr","1000000000000-other":"0 Lk Cr","10000000000000-one":"00 Lk Cr","10000000000000-other":"00 Lk Cr","100000000000000-one":"0 Cr Cr","100000000000000-other":"0 Cr Cr"}};o["sap-short"]=o["short"];var s=i?o:a;var u=s[e];if(!u){u=s["short"]}if(t!=="one"){t="other"}n=u[r+"-"+t];return n}s.prototype._checkGrouping=function(e,r,t,i){if(r.groupingSeparator&&e.includes(r.groupingSeparator)){e=e.replace(/^-/,"");e=e.replace(/^0+(\d)/,"$1");if(e.startsWith("0")||e.startsWith(r.groupingSeparator)){return false}if(t){e=e.replace(/[eE].*/,"")}var n=e.includes(r.decimalSeparator);if(r.decimalSeparator===r.groupingSeparator){n=false}else if(n){e=e.split(r.decimalSeparator)[0]}var a=e.split(r.groupingSeparator).length===2;if(a&&!n){var o=e.length-e.lastIndexOf(r.groupingSeparator);var s=r.groupingBaseSize||r.groupingSize;if(o!==s+r.groupingSeparator.length){return false}}if(r.strictGroupingValidation){var u;if(i){this._rIndianCurrencyINRGrouping=this._rIndianCurrencyINRGrouping||l();u=this._rIndianCurrencyINRGrouping}else{this._rGrouping=this._rGrouping||g(r.groupingSeparator,r.groupingSize,r.groupingBaseSize||r.groupingSize);u=this._rGrouping}if(!u.test(e)){return false}}}return true};function F(e){return e.indexOf("e")>0||e.indexOf("E")>0}function D(e){var r=s._shiftDecimalPoint(e,0);if(r.indexOf(".")>0&&!c.test(r.split(".")[1])){return undefined}var t=parseFloat(r);var i=""+t;if(F(i)){i=s._shiftDecimalPoint(i,0)}var n=parseInt(i);if(n!==t){return undefined}return n}function v(e,r,t){if(typeof e!=="number"){return NaN}t=t||s.RoundingMode.HALF_AWAY_FROM_ZERO;r=parseInt(r);var i=""+e;if(!F(i)){var n=i.indexOf(".");if(n<0){return e}if(i.substring(n+1).length<=r){return e}}if(typeof t==="function"){e=t(e,r)}else{if(t.match(/^[a-z_]+$/)){t=t.toUpperCase()}if(!r){return d[t](e)}e=s._shiftDecimalPoint(d[t](s._shiftDecimalPoint(e,r)),-r)}return e}function O(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function L(e,r){var t=Math.floor(Math.log(Math.abs(e))/Math.LN10);return Math.max(0,r-t-1)}function N(e,r,t,i){var n,a,o,s,u,c,l,g,f,m,d,p={numberValue:undefined,cldrCode:[]},h=[],C=true,y=true,S=Number.POSITIVE_INFINITY,b=true,F=r.toLocaleLowerCase(i);for(f in e){for(a in e[f]){if(!a.startsWith("unitPattern")){continue}m=e[f][a];s=m.indexOf("{0}");n=s>-1;if(n&&!t){m=m.replace("{0}","").trim();n=false}o=undefined;C=true;if(n){l=m.substring(0,s);g=l.toLocaleLowerCase(i);u=m.substring(s+"{0}".length);c=u.toLocaleLowerCase(i);if(r.startsWith(l)&&r.endsWith(u)){o=r.substring(l.length,r.length-u.length)}else if(F.startsWith(g)&&F.endsWith(c)){C=false;o=r.substring(g.length,F.length-c.length)}if(o){if(o.length<S){S=o.length;b=C;p.numberValue=o;p.cldrCode=[f]}else if(o.length===S&&p.cldrCode.indexOf(f)===-1){if(C&&!b){p.numberValue=o;p.cldrCode=[f];b=true}else if(C||!b){p.cldrCode.push(f)}}}}else{d=m.toLocaleLowerCase(i);if(m===r||d===F){if(t){if(a.endsWith("-zero")){o="0"}else if(a.endsWith("-one")){o="1"}else if(a.endsWith("-two")){o="2"}if(m===r){p.numberValue=o;p.cldrCode=[f];return p}else if(!p.cldrCode.includes(f)){y=false;p.numberValue=o;p.cldrCode.push(f)}}else if(p.cldrCode.indexOf(f)===-1){if(m===r){p.cldrCode.push(f)}else if(!h.includes(f)){h.push(f)}}}}}}if((!b||!y)&&p.cldrCode.length>1){p.numberValue=undefined}if(!t&&!p.cldrCode.length){p.cldrCode=h}return p}function R(e,r,t){var i,n,a,s,u,c,l,g,f=false,m=false,d="";for(n in r){a=r[n];if(!a){continue}if(e.indexOf(a)>=0&&d.length<=a.length){i=n;f=false;m=true;d=a;l=a}else if(t){c=o.getLanguageTag();s=a.toLocaleUpperCase(c);u=e.toLocaleUpperCase(c).indexOf(s);if(u>=0){if(d.length===a.length&&!m){f=true}else if(d.length<a.length){g=e.substring(u,u+a.length);if(g.toLocaleUpperCase(c)===s){i=n;f=false;m=false;d=a;l=g}}}}}if(f||!i){return{}}return{code:i,recognizedCurrency:l,symbol:d}}function I(e){var r,t=e.value;var n=R(t,e.currencySymbols);if(!n.code){n=R(t,e.customCurrencyCodes,true);if(!n.code&&!e.customCurrenciesAvailable){r=t.match(/(^[A-Z]{3}|[A-Z]{3}$)/i);n.code=r&&r[0].toLocaleUpperCase(o.getLanguageTag());n.recognizedCurrency=r&&r[0]}}if(n.code){var a=n.recognizedCurrency.length-1;var s=n.recognizedCurrency.charAt(a);var u;var c=/[\-\s]+/;if(/\d$/.test(s)){if(t.startsWith(n.recognizedCurrency)){u=a+1;if(!c.test(t.charAt(u))){return undefined}}}else if(/^\d/.test(n.recognizedCurrency)){if(t.endsWith(n.recognizedCurrency)){u=t.indexOf(n.recognizedCurrency)-1;if(!c.test(t.charAt(u))){return undefined}}}t=t.replace(n.recognizedCurrency,"")}var l=false;if(e.duplicatedSymbols&&e.duplicatedSymbols[n.symbol]){n.code=undefined;l=true;i.error("The parsed currency symbol '"+n.symbol+"' is defined multiple "+"times in custom currencies.Therefore the result is not distinct.")}return{numberValue:t,currencyCode:n.code||undefined,duplicatedSymbolFound:l}}return s});