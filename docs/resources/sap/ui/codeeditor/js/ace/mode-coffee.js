ace.define("ace/mode/coffee_highlight_rules",[],function(e,t,n){"use strict";var r=e("../lib/oop");var a=e("./text_highlight_rules").TextHighlightRules;r.inherits(o,a);function o(){var e="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";var t="this|throw|then|try|typeof|super|switch|return|break|by|continue|"+"catch|class|in|instanceof|is|isnt|if|else|extends|for|own|"+"finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|"+"or|on|unless|until|and|yes|yield|export|import|default";var n="true|false|null|undefined|NaN|Infinity";var r="case|const|function|var|void|with|enum|implements|"+"interface|let|package|private|protected|public|static";var a="Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|"+"Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"+"SyntaxError|TypeError|URIError|"+"ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"+"Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray";var o="Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|"+"encodeURIComponent|decodeURI|decodeURIComponent|String|";var i="window|arguments|prototype|document";var s=this.createKeywordMapper({keyword:t,"constant.language":n,"invalid.illegal":r,"language.support.class":a,"language.support.function":o,"variable.language":i},"identifier");var g={token:["paren.lparen","variable.parameter","paren.rparen","text","storage.type"],regex:/(?:(\()((?:"[^")]*?"|'[^')]*?'|\/[^\/)]*?\/|[^()"'\/])*?)(\))(\s*))?([\-=]>)/.source};var c=/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)/;this.$rules={start:[{token:"constant.numeric",regex:"(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"},{stateName:"qdoc",token:"string",regex:"'''",next:[{token:"string",regex:"'''",next:"start"},{token:"constant.language.escape",regex:c},{defaultToken:"string"}]},{stateName:"qqdoc",token:"string",regex:'"""',next:[{token:"string",regex:'"""',next:"start"},{token:"paren.string",regex:"#{",push:"start"},{token:"constant.language.escape",regex:c},{defaultToken:"string"}]},{stateName:"qstring",token:"string",regex:"'",next:[{token:"string",regex:"'",next:"start"},{token:"constant.language.escape",regex:c},{defaultToken:"string"}]},{stateName:"qqstring",token:"string.start",regex:'"',next:[{token:"string.end",regex:'"',next:"start"},{token:"paren.string",regex:"#{",push:"start"},{token:"constant.language.escape",regex:c},{defaultToken:"string"}]},{stateName:"js",token:"string",regex:"`",next:[{token:"string",regex:"`",next:"start"},{token:"constant.language.escape",regex:c},{defaultToken:"string"}]},{regex:"[{}]",onMatch:function(e,t,n){this.next="";if(e=="{"&&n.length){n.unshift("start",t);return"paren"}if(e=="}"&&n.length){n.shift();this.next=n.shift()||"";if(this.next.indexOf("string")!=-1)return"paren.string"}return"paren"}},{token:"string.regex",regex:"///",next:"heregex"},{token:"string.regex",regex:/(?:\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)(?:[imgy]{0,4})(?!\w)/},{token:"comment",regex:"###(?!#)",next:"comment"},{token:"comment",regex:"#.*"},{token:["punctuation.operator","text","identifier"],regex:"(\\.)(\\s*)("+r+")"},{token:"punctuation.operator",regex:"\\.{1,3}"},{token:["keyword","text","language.support.class","text","keyword","text","language.support.class"],regex:"(class)(\\s+)("+e+")(?:(\\s+)(extends)(\\s+)("+e+"))?"},{token:["entity.name.function","text","keyword.operator","text"].concat(g.token),regex:"("+e+")(\\s*)([=:])(\\s*)"+g.regex},g,{token:"variable",regex:"@(?:"+e+")?"},{token:s,regex:e},{token:"punctuation.operator",regex:"\\,|\\."},{token:"storage.type",regex:"[\\-=]>"},{token:"keyword.operator",regex:"(?:[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"},{token:"paren.lparen",regex:"[({[]"},{token:"paren.rparen",regex:"[\\]})]"},{token:"text",regex:"\\s+"}],heregex:[{token:"string.regex",regex:".*?///[imgy]{0,4}",next:"start"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{token:"string.regex",regex:"\\S+"}],comment:[{token:"comment",regex:"###",next:"start"},{defaultToken:"comment"}]};this.normalizeRules()}t.CoffeeHighlightRules=o});ace.define("ace/mode/matching_brace_outdent",[],function(e,t,n){"use strict";var r=e("../range").Range;var a=function(){};(function(){this.checkOutdent=function(e,t){if(!/^\s+$/.test(e))return false;return/^\s*\}/.test(t)};this.autoOutdent=function(e,t){var n=e.getLine(t);var a=n.match(/^(\s*\})/);if(!a)return 0;var o=a[1].length;var i=e.findMatchingBracket({row:t,column:o});if(!i||i.row==t)return 0;var s=this.$getIndent(e.getLine(i.row));e.replace(new r(t,0,t,o-1),s)};this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(a.prototype);t.MatchingBraceOutdent=a});ace.define("ace/mode/folding/coffee",[],function(e,t,n){"use strict";var r=e("../../lib/oop");var a=e("./fold_mode").FoldMode;var o=e("../../range").Range;var i=t.FoldMode=function(){};r.inherits(i,a);(function(){this.getFoldWidgetRange=function(e,t,n){var r=this.indentationBlock(e,n);if(r)return r;var a=/\S/;var i=e.getLine(n);var s=i.search(a);if(s==-1||i[s]!="#")return;var g=i.length;var c=e.getLength();var f=n;var u=n;while(++n<c){i=e.getLine(n);var l=i.search(a);if(l==-1)continue;if(i[l]!="#")break;u=n}if(u>f){var d=e.getLine(u).length;return new o(f,g,u,d)}};this.getFoldWidget=function(e,t,n){var r=e.getLine(n);var a=r.search(/\S/);var o=e.getLine(n+1);var i=e.getLine(n-1);var s=i.search(/\S/);var g=o.search(/\S/);if(a==-1){e.foldWidgets[n-1]=s!=-1&&s<g?"start":"";return""}if(s==-1){if(a==g&&r[a]=="#"&&o[a]=="#"){e.foldWidgets[n-1]="";e.foldWidgets[n+1]="";return"start"}}else if(s==a&&r[a]=="#"&&i[a]=="#"){if(e.getLine(n-2).search(/\S/)==-1){e.foldWidgets[n-1]="start";e.foldWidgets[n+1]="";return""}}if(s!=-1&&s<a)e.foldWidgets[n-1]="start";else e.foldWidgets[n-1]="";if(a<g)return"start";else return""}}).call(i.prototype)});ace.define("ace/mode/coffee",[],function(e,t,n){"use strict";var r=e("./coffee_highlight_rules").CoffeeHighlightRules;var a=e("./matching_brace_outdent").MatchingBraceOutdent;var o=e("./folding/coffee").FoldMode;var i=e("../range").Range;var s=e("./text").Mode;var g=e("../worker/worker_client").WorkerClient;var c=e("../lib/oop");function f(){this.HighlightRules=r;this.$outdent=new a;this.foldingRules=new o}c.inherits(f,s);(function(){var e=/(?:[({[=:]|[-=]>|\b(?:else|try|(?:swi|ca)tch(?:\s+[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$|^\s*(else\b\s*)?(?:if|for|while|loop)\b(?!.*\bthen\b)/;this.lineCommentStart="#";this.blockComment={start:"###",end:"###"};this.getNextLineIndent=function(t,n,r){var a=this.$getIndent(n);var o=this.getTokenizer().getLineTokens(n,t).tokens;if(!(o.length&&o[o.length-1].type==="comment")&&t==="start"&&e.test(n))a+=r;return a};this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)};this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)};this.createWorker=function(e){var t=new g(["ace"],"ace/mode/coffee_worker","Worker");t.attachToDocument(e.getDocument());t.on("annotate",function(t){e.setAnnotations(t.data)});t.on("terminate",function(){e.clearAnnotations()});return t};this.$id="ace/mode/coffee";this.snippetFileId="ace/snippets/coffee"}).call(f.prototype);t.Mode=f});(function(){ace.require(["ace/mode/coffee"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();