ace.define("ace/mode/jssm_highlight_rules",[],function(e,t,n){"use strict";var o=e("../lib/oop");var r=e("./text_highlight_rules").TextHighlightRules;var i=function(){this.$rules={start:[{token:"punctuation.definition.comment.mn",regex:/\/\*/,push:[{token:"punctuation.definition.comment.mn",regex:/\*\//,next:"pop"},{defaultToken:"comment.block.jssm"}],comment:"block comment"},{token:"comment.line.jssm",regex:/\/\//,push:[{token:"comment.line.jssm",regex:/$/,next:"pop"},{defaultToken:"comment.line.jssm"}],comment:"block comment"},{token:"entity.name.function",regex:/\${/,push:[{token:"entity.name.function",regex:/}/,next:"pop"},{defaultToken:"keyword.other"}],comment:"js outcalls"},{token:"constant.numeric",regex:/[0-9]*\.[0-9]*\.[0-9]*/,comment:"semver"},{token:"constant.language.jssmLanguage",regex:/graph_layout\s*:/,comment:"jssm language tokens"},{token:"constant.language.jssmLanguage",regex:/machine_name\s*:/,comment:"jssm language tokens"},{token:"constant.language.jssmLanguage",regex:/machine_version\s*:/,comment:"jssm language tokens"},{token:"constant.language.jssmLanguage",regex:/jssm_version\s*:/,comment:"jssm language tokens"},{token:"keyword.control.transition.jssmArrow.legal_legal",regex:/<->/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.legal_none",regex:/<-/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.none_legal",regex:/->/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.main_main",regex:/<=>/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.none_main",regex:/=>/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.main_none",regex:/<=/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.forced_forced",regex:/<~>/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.none_forced",regex:/~>/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.forced_none",regex:/<~/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.legal_main",regex:/<-=>/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.main_legal",regex:/<=->/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.legal_forced",regex:/<-~>/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.forced_legal",regex:/<~->/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.main_forced",regex:/<=~>/,comment:"transitions"},{token:"keyword.control.transition.jssmArrow.forced_main",regex:/<~=>/,comment:"transitions"},{token:"constant.numeric.jssmProbability",regex:/[0-9]+%/,comment:"edge probability annotation"},{token:"constant.character.jssmAction",regex:/\'[^']*\'/,comment:"action annotation"},{token:"entity.name.tag.jssmLabel.doublequoted",regex:/\"[^"]*\"/,comment:"jssm label annotation"},{token:"entity.name.tag.jssmLabel.atom",regex:/[a-zA-Z0-9_.+&()#@!?,]/,comment:"jssm label annotation"}]};this.normalizeRules()};i.metaData={fileTypes:["jssm","jssm_state"],name:"JSSM",scopeName:"source.jssm"};o.inherits(i,r);t.JSSMHighlightRules=i});ace.define("ace/mode/folding/cstyle",[],function(e,t,n){"use strict";var o=e("../../lib/oop");var r=e("../../range").Range;var i=e("./fold_mode").FoldMode;var s=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};o.inherits(s,i);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,n){var o=e.getLine(n);if(this.singleLineBlockCommentRe.test(o)){if(!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return""}var r=this._getFoldWidgetBase(e,t,n);if(!r&&this.startRegionRe.test(o))return"start";return r};this.getFoldWidgetRange=function(e,t,n,o){var r=e.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(e,r,n);var i=r.match(this.foldingStartMarker);if(i){var s=i.index;if(i[1])return this.openingBracketBlock(e,i[1],n,s);var a=e.getCommentFoldRange(n,s+i[0].length,1);if(a&&!a.isMultiLine()){if(o){a=this.getSectionRange(e,n)}else if(t!="all")a=null}return a}if(t==="markbegin")return;var i=r.match(this.foldingStopMarker);if(i){var s=i.index+i[0].length;if(i[1])return this.closingBracketBlock(e,i[1],n,s);return e.getCommentFoldRange(n,s,-1)}};this.getSectionRange=function(e,t){var n=e.getLine(t);var o=n.search(/\S/);var i=t;var s=n.length;t=t+1;var a=t;var m=e.getLength();while(++t<m){n=e.getLine(t);var l=n.search(/\S/);if(l===-1)continue;if(o>l)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=i){break}else if(g.isMultiLine()){t=g.end.row}else if(o==l){break}}a=t}return new r(i,s,a,e.getLine(a).length)};this.getCommentRegionBlock=function(e,t,n){var o=t.search(/\s*$/);var i=e.getLength();var s=n;var a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var m=1;while(++n<i){t=e.getLine(n);var l=a.exec(t);if(!l)continue;if(l[1])m--;else m++;if(!m)break}var g=n;if(g>s){return new r(s,o,g,t.length)}}}).call(s.prototype)});ace.define("ace/mode/jssm",[],function(e,t,n){"use strict";var o=e("../lib/oop");var r=e("./text").Mode;var i=e("./jssm_highlight_rules").JSSMHighlightRules;var s=e("./folding/cstyle").FoldMode;var a=function(){this.HighlightRules=i;this.foldingRules=new s};o.inherits(a,r);(function(){this.lineCommentStart="//";this.blockComment={start:"/*",end:"*/"};this.$id="ace/mode/jssm"}).call(a.prototype);t.Mode=a});(function(){ace.require(["ace/mode/jssm"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();