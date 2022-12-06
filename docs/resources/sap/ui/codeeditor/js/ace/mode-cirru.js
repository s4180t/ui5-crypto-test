ace.define("ace/mode/cirru_highlight_rules",[],function(e,t,r){"use strict";var i=e("../lib/oop");var n=e("./text_highlight_rules").TextHighlightRules;var o=function(){this.$rules={start:[{token:"constant.numeric",regex:/[\d\.]+/},{token:"comment.line.double-dash",regex:/--/,next:"comment"},{token:"storage.modifier",regex:/\(/},{token:"storage.modifier",regex:/,/,next:"line"},{token:"support.function",regex:/[^\(\)"\s{}\[\]]+/,next:"line"},{token:"string.quoted.double",regex:/"/,next:"string"},{token:"storage.modifier",regex:/\)/}],comment:[{token:"comment.line.double-dash",regex:/ +[^\n]+/,next:"start"}],string:[{token:"string.quoted.double",regex:/"/,next:"line"},{token:"constant.character.escape",regex:/\\/,next:"escape"},{token:"string.quoted.double",regex:/[^\\"]+/}],escape:[{token:"constant.character.escape",regex:/./,next:"string"}],line:[{token:"constant.numeric",regex:/[\d\.]+/},{token:"markup.raw",regex:/^\s*/,next:"start"},{token:"storage.modifier",regex:/\$/,next:"start"},{token:"variable.parameter",regex:/[^\(\)"\s{}\[\]]+/},{token:"storage.modifier",regex:/\(/,next:"start"},{token:"storage.modifier",regex:/\)/},{token:"markup.raw",regex:/^ */,next:"start"},{token:"string.quoted.double",regex:/"/,next:"string"}]}};i.inherits(o,n);t.CirruHighlightRules=o});ace.define("ace/mode/folding/coffee",[],function(e,t,r){"use strict";var i=e("../../lib/oop");var n=e("./fold_mode").FoldMode;var o=e("../../range").Range;var a=t.FoldMode=function(){};i.inherits(a,n);(function(){this.getFoldWidgetRange=function(e,t,r){var i=this.indentationBlock(e,r);if(i)return i;var n=/\S/;var a=e.getLine(r);var s=a.search(n);if(s==-1||a[s]!="#")return;var g=a.length;var d=e.getLength();var l=r;var u=r;while(++r<d){a=e.getLine(r);var c=a.search(n);if(c==-1)continue;if(a[c]!="#")break;u=r}if(u>l){var f=e.getLine(u).length;return new o(l,g,u,f)}};this.getFoldWidget=function(e,t,r){var i=e.getLine(r);var n=i.search(/\S/);var o=e.getLine(r+1);var a=e.getLine(r-1);var s=a.search(/\S/);var g=o.search(/\S/);if(n==-1){e.foldWidgets[r-1]=s!=-1&&s<g?"start":"";return""}if(s==-1){if(n==g&&i[n]=="#"&&o[n]=="#"){e.foldWidgets[r-1]="";e.foldWidgets[r+1]="";return"start"}}else if(s==n&&i[n]=="#"&&a[n]=="#"){if(e.getLine(r-2).search(/\S/)==-1){e.foldWidgets[r-1]="start";e.foldWidgets[r+1]="";return""}}if(s!=-1&&s<n)e.foldWidgets[r-1]="start";else e.foldWidgets[r-1]="";if(n<g)return"start";else return""}}).call(a.prototype)});ace.define("ace/mode/cirru",[],function(e,t,r){"use strict";var i=e("../lib/oop");var n=e("./text").Mode;var o=e("./cirru_highlight_rules").CirruHighlightRules;var a=e("./folding/coffee").FoldMode;var s=function(){this.HighlightRules=o;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};i.inherits(s,n);(function(){this.lineCommentStart="--";this.$id="ace/mode/cirru"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/cirru"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();