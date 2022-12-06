ace.define("ace/mode/c9search_highlight_rules",[],function(e,t,r){"use strict";var n=e("../lib/oop");var i=e("../lib/lang");var a=e("./text_highlight_rules").TextHighlightRules;function s(e,t){try{return new RegExp(e,t)}catch(e){}}var u=function(){this.$rules={start:[{tokenNames:["c9searchresults.constant.numeric","c9searchresults.text","c9searchresults.text","c9searchresults.keyword"],regex:/(^\s+[0-9]+)(:)(\d*\s?)([^\r\n]+)/,onMatch:function(e,t,r){var n=this.splitRegex.exec(e);var i=this.tokenNames;var a=[{type:i[0],value:n[1]},{type:i[1],value:n[2]}];if(n[3]){if(n[3]==" ")a[1]={type:i[1],value:n[2]+" "};else a.push({type:i[1],value:n[3]})}var s=r[1];var u=n[4];var c;var o=0;if(s&&s.exec){s.lastIndex=0;while(c=s.exec(u)){var h=u.substring(o,c.index);o=s.lastIndex;if(h)a.push({type:i[2],value:h});if(c[0])a.push({type:i[3],value:c[0]});else if(!h)break}}if(o<u.length)a.push({type:i[2],value:u.substr(o)});return a}},{regex:"^Searching for [^\\r\\n]*$",onMatch:function(e,t,r){var n=e.split("");if(n.length<3)return"text";var a,u;var c=0;var o=[{value:n[c++]+"'",type:"text"},{value:u=n[c++],type:"text"},{value:"'"+n[c++],type:"text"}];if(n[2]!==" in"){o.push({value:"'"+n[c++]+"'",type:"text"},{value:n[c++],type:"text"})}o.push({value:" "+n[c++]+" ",type:"text"});if(n[c+1]){a=n[c+1];o.push({value:"("+n[c+1]+")",type:"text"});c+=1}else{c-=1}while(c++<n.length){n[c]&&o.push({value:n[c],type:"text"})}if(u){if(!/regex/.test(a))u=i.escapeRegExp(u);if(/whole/.test(a))u="\\b"+u+"\\b"}var h=u&&s("("+u+")",/ sensitive/.test(a)?"g":"ig");if(h){r[0]=t;r[1]=h}return o}},{regex:"^(?=Found \\d+ matches)",token:"text",next:"numbers"},{token:"string",regex:"^\\S:?[^:]+",next:"numbers"}],numbers:[{regex:"\\d+",token:"constant.numeric"},{regex:"$",token:"text",next:"start"}]};this.normalizeRules()};n.inherits(u,a);t.C9SearchHighlightRules=u});ace.define("ace/mode/matching_brace_outdent",[],function(e,t,r){"use strict";var n=e("../range").Range;var i=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var r=e.getLine(t);var i=r.match(/^(\s*\})/);if(!i)return 0;var a=i[1].length;var s=e.findMatchingBracket({row:t,column:a});if(!s||s.row==t)return 0;var u=this.$getIndent(e.getLine(s.row));e.replace(new n(t,0,t,a-1),u)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(i.prototype);t.MatchingBraceOutdent=i});ace.define("ace/mode/folding/c9search",[],function(e,t,r){"use strict";var n=e("../../lib/oop");var i=e("../../range").Range;var a=e("./fold_mode").FoldMode;var s=t.FoldMode=function(){};n.inherits(s,a);(function(){this.foldingStartMarker=/^(\S.*:|Searching for.*)$/;this.foldingStopMarker=/^(\s+|Found.*)$/;this.getFoldWidgetRange=function(e,t,r){var n=e.doc.getAllLines(r);var a=n[r];var s=/^(Found.*|Searching for.*)$/;var u=/^(\S.*:|\s*)$/;var c=s.test(a)?s:u;var o=r;var h=r;if(this.foldingStartMarker.test(a)){for(var l=r+1,f=e.getLength();l<f;l++){if(c.test(n[l]))break}h=l}else if(this.foldingStopMarker.test(a)){for(var l=r-1;l>=0;l--){a=n[l];if(c.test(a))break}o=l}if(o!=h){var g=a.length;if(c===s)g=a.search(/\(Found[^)]+\)$|$/);return new i(o,g,h,0)}}}).call(s.prototype)});ace.define("ace/mode/c9search",[],function(e,t,r){"use strict";var n=e("../lib/oop");var i=e("./text").Mode;var a=e("./c9search_highlight_rules").C9SearchHighlightRules;var s=e("./matching_brace_outdent").MatchingBraceOutdent;var u=e("./folding/c9search").FoldMode;var c=function(){this.HighlightRules=a;this.$outdent=new s;this.foldingRules=new u};n.inherits(c,i);(function(){this.getNextLineIndent=function(e,t,r){var n=this.$getIndent(t);return n};this.checkOutdent=function(e,t,r){return this.$outdent.checkOutdent(t,r)};this.autoOutdent=function(e,t,r){this.$outdent.autoOutdent(t,r)};this.$id="ace/mode/c9search"}).call(c.prototype);t.Mode=c});(function(){ace.require(["ace/mode/c9search"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();