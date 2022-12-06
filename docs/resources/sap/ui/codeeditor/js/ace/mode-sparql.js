ace.define("ace/mode/sparql_highlight_rules",[],function(e,t,r){"use strict";var i=e("../lib/oop");var a=e("./text_highlight_rules").TextHighlightRules;var n=function(){this.$rules={start:[{include:"#comments"},{include:"#strings"},{include:"#string-language-suffixes"},{include:"#string-datatype-suffixes"},{include:"#logic-operators"},{include:"#relative-urls"},{include:"#xml-schema-types"},{include:"#rdf-schema-types"},{include:"#owl-types"},{include:"#qnames"},{include:"#keywords"},{include:"#built-in-functions"},{include:"#variables"},{include:"#boolean-literal"},{include:"#punctuation-operators"}],"#boolean-literal":[{token:"constant.language.boolean.sparql",regex:/true|false/}],"#built-in-functions":[{token:"support.function.sparql",regex:/[Aa][Bb][Ss]|[Aa][Vv][Gg]|[Bb][Nn][Oo][Dd][Ee]|[Bb][Oo][Uu][Nn][Dd]|[Cc][Ee][Ii][Ll]|[Cc][Oo][Aa][Ll][Ee][Ss][Cc][Ee]|[Cc][Oo][Nn][Cc][Aa][Tt]|[Cc][Oo][Nn][Tt][Aa][Ii][Nn][Ss]|[Cc][Oo][Uu][Nn][Tt]|[Dd][Aa][Tt][Aa][Tt][Yy][Pp][Ee]|[Dd][Aa][Yy]|[Ee][Nn][Cc][Oo][Dd][Ee]_[Ff][Oo][Rr]_[Uu][Rr][Ii]|[Ee][Xx][Ii][Ss][Tt][Ss]|[Ff][Ll][Oo][Oo][Rr]|[Gg][Rr][Oo][Uu][Pp]_[Cc][Oo][Nn][Cc][Aa][Tt]|[Hh][Oo][Uu][Rr][Ss]|[Ii][Ff]|[Ii][Rr][Ii]|[Ii][Ss][Bb][Ll][Aa][Nn][Kk]|[Ii][Ss][Ii][Rr][Ii]|[Ii][Ss][Ll][Ii][Tt][Ee][Rr][Aa][Ll]|[Ii][Ss][Nn][Uu][Mm][Ee][Rr][Ii][Cc]|[Ii][Ss][Uu][Rr][Ii]|[Ll][Aa][Nn][Gg]|[Ll][Aa][Nn][Gg][Mm][Aa][Tt][Cc][Hh][Ee][Ss]|[Ll][Cc][Aa][Ss][Ee]|[Mm][Aa][Xx]|[Mm][Dd]5|[Mm][Ii][Nn]|[Mm][Ii][Nn][Uu][Tt][Ee][Ss]|[Mm][Oo][Nn][Tt][Hh]|[Nn][Oo][Ww]|[Rr][Aa][Nn][Dd]|[Rr][Ee][Gg][Ee][Xx]|[Rr][Ee][Pp][Ll][Aa][Cc][Ee]|[Rr][Oo][Uu][Nn][Dd]|[Ss][Aa][Mm][Ee][Tt][Ee][Rr][Mm]|[Ss][Aa][Mm][Pp][Ll][Ee]|[Ss][Ee][Cc][Oo][Nn][Dd][Ss]|[Ss][Ee][Pp][Aa][Rr][Aa][Tt][Oo][Rr]|[Ss][Hh][Aa](?:1|256|384|512)|[Ss][Tt][Rr]|[Ss][Tt][Rr][Aa][Ff][Tt][Ee][Rr]|[Ss][Tt][Rr][Bb][Ee][Ff][Oo][Rr][Ee]|[Ss][Tt][Rr][Dd][Tt]|[Ss][Tt][Rr][Ee][Nn][Dd][Ss]|[Ss][Tt][Rr][Ll][Aa][Nn][Gg]|[Ss][Tt][Rr][Ll][Ee][Nn]|[Ss][Tt][Rr][Ss][Tt][Aa][Rr][Tt][Ss]|[Ss][Tt][Rr][Uu][Uu][Ii][Dd]|[Ss][Uu][Bb][Ss][Tt][Rr]|[Ss][Uu][Mm]|[Tt][Ii][Mm][Ee][Zz][Oo][Nn][Ee]|[Tt][Zz]|[Uu][Cc][Aa][Ss][Ee]|[Uu][Rr][Ii]|[Uu][Uu][Ii][Dd]|[Yy][Ee][Aa][Rr]/}],"#comments":[{token:["punctuation.definition.comment.sparql","comment.line.hash.sparql"],regex:/(#)(.*$)/}],"#keywords":[{token:"keyword.other.sparql",regex:/[Aa][Dd][Dd]|[Aa][Ll][Ll]|[Aa][Ss]|[As][Ss][Cc]|[Aa][Ss][Kk]|[Bb][Aa][Ss][Ee]|[Bb][Ii][Nn][Dd]|[Bb][Yy]|[Cc][Ll][Ee][Aa][Rr]|[Cc][Oo][Nn][Ss][Tt][Rr][Uu][Cc][Tt]|[Cc][Oo][Pp][Yy]|[Cc][Rr][Ee][Aa][Tt][Ee]|[Dd][Aa][Tt][Aa]|[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Dd][Ee][Ll][Ee][Tt][Ee]|[Dd][Ee][Sc][Cc]|[Dd][Ee][Ss][Cc][Rr][Ii][Bb][Ee]|[Dd][Ii][Ss][Tt][Ii][Nn][Cc][Tt]|[Dd][Rr][Oo][Pp]|[Ff][Ii][Ll][Tt][Ee][Rr]|[Ff][Rr][Oo][Mm]|[Gg][Rr][Aa][Pp][Hh]|[Gg][Rr][Oo][Uu][Pp]|[Hh][Aa][Vv][Ii][Nn][Gg]|[Ii][Nn][Ss][Ee][Rr][Tt]|[Ll][Ii][Mm][Ii][Tt]|[Ll][Oo][Aa][Dd]|[Mm][Ii][Nn][Uu][Ss]|[Mm][Oo][Vv][Ee]|[Nn][Aa][Mm][Ee][Dd]|[Oo][Ff][Ff][Ss][Ee][Tt]|[Oo][Pp][Tt][Ii][Oo][Nn][Aa][Ll]|[Oo][Rr][Dd][Ee][Rr]|[Pp][Rr][Ee][Ff][Ii][Xx]|[Rr][Ee][Dd][Uu][Cc][Ee][Dd]|[Ss][Ee][Ll][Ee][Cc][Tt]|[Ss][Ee][Pp][Aa][Rr][Aa][Tt][Oo][Rr]|[Ss][Ee][Rr][Vv][Ii][Cc][Ee]|[Ss][Ii][Ll][Ee][Nn][Tt]|[Tt][Oo]|[Uu][Nn][Dd][Ee][Ff]|[Uu][Nn][Ii][Oo][Nn]|[Uu][Ss][Ii][Nn][Gg]|[Vv][Aa][Ll][Uu][Ee][Ss]|[Ww][He][Ee][Rr][Ee]|[Ww][Ii][Tt][Hh]/}],"#logic-operators":[{token:"keyword.operator.logical.sparql",regex:/\|\||&&|=|!=|<|>|<=|>=|(?:^|!?\s)IN(?:!?\s|$)|(?:^|!?\s)NOT(?:!?\s|$)|-|\+|\*|\/|\!/}],"#owl-types":[{token:"support.type.datatype.owl.sparql",regex:/owl:[a-zA-Z]+/}],"#punctuation-operators":[{token:"keyword.operator.punctuation.sparql",regex:/;|,|\.|\(|\)|\{|\}|\|/}],"#qnames":[{token:"entity.name.other.qname.sparql",regex:/(?:[a-zA-Z][-_a-zA-Z0-9]*)?:(?:[_a-zA-Z][-_a-zA-Z0-9]*)?/}],"#rdf-schema-types":[{token:"support.type.datatype.rdf.schema.sparql",regex:/rdfs?:[a-zA-Z]+|(?:^|\s)a(?:\s|$)/}],"#relative-urls":[{token:"string.quoted.other.relative.url.sparql",regex:/</,push:[{token:"string.quoted.other.relative.url.sparql",regex:/>/,next:"pop"},{defaultToken:"string.quoted.other.relative.url.sparql"}]}],"#string-datatype-suffixes":[{token:"keyword.operator.datatype.suffix.sparql",regex:/\^\^/}],"#string-language-suffixes":[{token:["keyword.operator.language.suffix.sparql","constant.language.suffix.sparql"],regex:/(?!")(@)([a-z]+(?:\-[a-z0-9]+)*)/}],"#strings":[{token:"string.quoted.triple.sparql",regex:/"""/,push:[{token:"string.quoted.triple.sparql",regex:/"""/,next:"pop"},{defaultToken:"string.quoted.triple.sparql"}]},{token:"string.quoted.double.sparql",regex:/"/,push:[{token:"string.quoted.double.sparql",regex:/"/,next:"pop"},{token:"invalid.string.newline",regex:/$/},{token:"constant.character.escape.sparql",regex:/\\./},{defaultToken:"string.quoted.double.sparql"}]}],"#variables":[{token:"variable.other.sparql",regex:/(?:\?|\$)[-_a-zA-Z0-9]+/}],"#xml-schema-types":[{token:"support.type.datatype.schema.sparql",regex:/xsd?:[a-z][a-zA-Z]+/}]};this.normalizeRules()};n.metaData={fileTypes:["rq","sparql"],name:"SPARQL",scopeName:"source.sparql"};i.inherits(n,a);t.SPARQLHighlightRules=n});ace.define("ace/mode/folding/cstyle",[],function(e,t,r){"use strict";var i=e("../../lib/oop");var a=e("../../range").Range;var n=e("./fold_mode").FoldMode;var s=t.FoldMode=function(e){if(e){this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start));this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end))}};i.inherits(s,n);(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/;this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/;this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/;this._getFoldWidgetBase=this.getFoldWidget;this.getFoldWidget=function(e,t,r){var i=e.getLine(r);if(this.singleLineBlockCommentRe.test(i)){if(!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return""}var a=this._getFoldWidgetBase(e,t,r);if(!a&&this.startRegionRe.test(i))return"start";return a};this.getFoldWidgetRange=function(e,t,r,i){var a=e.getLine(r);if(this.startRegionRe.test(a))return this.getCommentRegionBlock(e,a,r);var n=a.match(this.foldingStartMarker);if(n){var s=n.index;if(n[1])return this.openingBracketBlock(e,n[1],r,s);var o=e.getCommentFoldRange(r,s+n[0].length,1);if(o&&!o.isMultiLine()){if(i){o=this.getSectionRange(e,r)}else if(t!="all")o=null}return o}if(t==="markbegin")return;var n=a.match(this.foldingStopMarker);if(n){var s=n.index+n[0].length;if(n[1])return this.closingBracketBlock(e,n[1],r,s);return e.getCommentFoldRange(r,s,-1)}};this.getSectionRange=function(e,t){var r=e.getLine(t);var i=r.search(/\S/);var n=t;var s=r.length;t=t+1;var o=t;var l=e.getLength();while(++t<l){r=e.getLine(t);var u=r.search(/\S/);if(u===-1)continue;if(i>u)break;var g=this.getFoldWidgetRange(e,"all",t);if(g){if(g.start.row<=n){break}else if(g.isMultiLine()){t=g.end.row}else if(i==u){break}}o=t}return new a(n,s,o,e.getLine(o).length)};this.getCommentRegionBlock=function(e,t,r){var i=t.search(/\s*$/);var n=e.getLength();var s=r;var o=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;var l=1;while(++r<n){t=e.getLine(r);var u=o.exec(t);if(!u)continue;if(u[1])l--;else l++;if(!l)break}var g=r;if(g>s){return new a(s,i,g,t.length)}}}).call(s.prototype)});ace.define("ace/mode/sparql",[],function(e,t,r){"use strict";var i=e("../lib/oop");var a=e("./text").Mode;var n=e("./sparql_highlight_rules").SPARQLHighlightRules;var s=e("./folding/cstyle").FoldMode;var o=function(){this.HighlightRules=n;this.foldingRules=new s};i.inherits(o,a);(function(){this.$id="ace/mode/sparql"}).call(o.prototype);t.Mode=o});(function(){ace.require(["ace/mode/sparql"],function(e){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=e}})})();