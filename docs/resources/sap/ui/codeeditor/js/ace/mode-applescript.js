ace.define("ace/mode/applescript_highlight_rules",[],function(e,t,i){"use strict";var r=e("../lib/oop");var n=e("./text_highlight_rules").TextHighlightRules;var o=function(){var e="about|above|after|against|and|around|as|at|back|before|beginning|"+"behind|below|beneath|beside|between|but|by|considering|"+"contain|contains|continue|copy|div|does|eighth|else|end|equal|"+"equals|error|every|exit|fifth|first|for|fourth|from|front|"+"get|given|global|if|ignoring|in|into|is|it|its|last|local|me|"+"middle|mod|my|ninth|not|of|on|onto|or|over|prop|property|put|ref|"+"reference|repeat|returning|script|second|set|seventh|since|"+"sixth|some|tell|tenth|that|the|then|third|through|thru|"+"timeout|times|to|transaction|try|until|where|while|whose|with|without";var t="AppleScript|false|linefeed|return|pi|quote|result|space|tab|true";var i="activate|beep|count|delay|launch|log|offset|read|round|run|say|"+"summarize|write";var r="alias|application|boolean|class|constant|date|file|integer|list|"+"number|real|record|string|text|character|characters|contents|day|"+"frontmost|id|item|length|month|name|paragraph|paragraphs|rest|"+"reverse|running|time|version|weekday|word|words|year";var n=this.createKeywordMapper({"support.function":i,"constant.language":t,"support.type":r,keyword:e},"identifier");this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"comment",regex:"\\(\\*",next:"comment"},{token:"string",regex:'".*?"'},{token:"support.type",regex:"\\b(POSIX file|POSIX path|(date|time) string|quoted form)\\b"},{token:"support.function",regex:"\\b(clipboard info|the clipboard|info for|list (disks|folder)|"+"mount volume|path to|(close|open for) access|(get|set) eof|"+"current date|do shell script|get volume settings|random number|"+"set volume|system attribute|system info|time to GMT|"+"(load|run|store) script|scripting components|"+"ASCII (character|number)|localized string|"+"choose (application|color|file|file name|"+"folder|from list|remote application|URL)|"+"display (alert|dialog))\\b|^\\s*return\\b"},{token:"constant.language",regex:"\\b(text item delimiters|current application|missing value)\\b"},{token:"keyword",regex:"\\b(apart from|aside from|instead of|out of|greater than|"+"isn't|(doesn't|does not) (equal|come before|come after|contain)|"+"(greater|less) than( or equal)?|(starts?|ends|begins?) with|"+"contained by|comes (before|after)|a (ref|reference))\\b"},{token:n,regex:"[a-zA-Z][a-zA-Z0-9_]*\\b"}],comment:[{token:"comment",regex:"\\*\\)",next:"start"},{defaultToken:"comment"}]};this.normalizeRules()};r.inherits(o,n);t.AppleScriptHighlightRules=o});ace.define("ace/mode/folding/cstyle",[],function(e,t,i){"use strict";var r=e("../../lib/oop");var n=e("../../range").Range;var o=e("./fold_mode").FoldMode;var a=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};r.inherits(a,o);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,i){var r=e.getLine(i);if(this.singleLineBlockCommentRe.test(r)){if(!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return""}var n=this._getFoldWidgetBase(e,t,i);if(!n&&this.startRegionRe.test(r))return"start";return n};this.getFoldWidgetRange=function(e,t,i,r){var n=e.getLine(i);if(this.startRegionRe.test(n))return this.getCommentRegionBlock(e,n,i);var o=n.match(this.foldingStartMarker);if(o){var a=o.index;if(o[1])return this.openingBracketBlock(e,o[1],i,a);var s=e.getCommentFoldRange(i,a+o[0].length,1);if(s&&!s.isMultiLine()){if(r){s=this.getSectionRange(e,i)}else if(t!="all")s=null}return s}if(t==="markbegin")return;var o=n.match(this.foldingStopMarker);if(o){var a=o.index+o[0].length;if(o[1])return this.closingBracketBlock(e,o[1],i,a);return e.getCommentFoldRange(i,a,-1)}};this.getSectionRange=function(e,t){var i=e.getLine(t);var r=i.search(/\S/);var o=t;var a=i.length;t=t+1;var s=t;var l=e.getLength();while(++t<l){i=e.getLine(t);var c=i.search(/\S/);if(c===-1)continue;if(r>c)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=o){break}else if(g.isMultiLine()){t=g.end.row}else if(r==c){break}}s=t}return new n(o,a,s,e.getLine(s).length)};this.getCommentRegionBlock=function(e,t,i){var r=t.search(/\s*$/);var o=e.getLength();var a=i;var s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++i<o){t=e.getLine(i);var c=s.exec(t);if(!c)continue;if(c[1])l--;else l++;if(!l)break}var g=i;if(g>a){return new n(a,r,g,t.length)}}}).call(a.prototype)});ace.define("ace/mode/applescript",[],function(e,t,i){"use strict";var r=e("../lib/oop");var n=e("./text").Mode;var o=e("./applescript_highlight_rules").AppleScriptHighlightRules;var a=e("./folding/cstyle").FoldMode;var s=function(){this.HighlightRules=o;this.foldingRules=new a;this.$behaviour=this.$defaultBehaviour};r.inherits(s,n);(function(){this.lineCommentStart="--";this.blockComment={start:"(*",end:"*)"};this.$id="ace/mode/applescript"}).call(s.prototype);t.Mode=s});(function(){ace.require(["ace/mode/applescript"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();