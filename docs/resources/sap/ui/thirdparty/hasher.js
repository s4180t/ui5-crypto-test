/*!!
 * Hasher <http://github.com/millermedeiros/hasher>
 * @author Miller Medeiros
 * @version 1.2.0 (2013/11/11 03:18 PM)
 * Released under the MIT License
 */
(function(){var e=function(e){var n=function(n){var t=25,i=n.document,a=n.history,r=e.Signal,o,s,c,f,l,u,p=/#(.*)$/,d=/(\?.*)|(\#.*)/,h=/^\#/,v=!+"\v1",g="onhashchange"in n&&i.documentMode!==7,w=v&&!g,m=location.protocol==="file:";function H(e){return String(e||"").replace(/\W/g,"\\$&")}function y(e){if(!e)return"";var n=new RegExp("^"+H(o.prependHash)+"|"+H(o.appendHash)+"$","g");return e.replace(n,"")}function E(){var e=p.exec(o.getURL());var n=e&&e[1]||"";try{return o.raw?n:decodeURIComponent(n)}catch(e){return n}}function R(){return l?l.contentWindow.frameHash:null}function L(){l=i.createElement("iframe");l.src="about:blank";l.style.display="none";i.body.appendChild(l)}function b(){if(l&&s!==R()){var e=l.contentWindow.document;e.open();e.write("<html><head><title>"+i.title+'</title><script type="text/javascript">var frameHash="'+s+'";<\/script></head><body>&nbsp;</body></html>');e.close()}}function x(e,n){if(s!==e){var t=s;s=e;if(w){if(!n){b()}else{l.contentWindow.frameHash=e}}return function(){o.changed.dispatch(y(e),y(t))}}}if(w){u=function(){var e=E(),n=R(),t;if(n!==s&&n!==e){o.setHash(y(n))}else if(e!==s){t=x(e);t&&t()}}}else{u=function(){var e=E(),n;if(e!==s){n=x(e);n&&n()}}}function I(e,n,t){if(e.addEventListener){e.addEventListener(n,t,false)}else if(e.attachEvent){e.attachEvent("on"+n,t)}}function U(e,n,t){if(e.removeEventListener){e.removeEventListener(n,t,false)}else if(e.detachEvent){e.detachEvent("on"+n,t)}}function z(e){e=Array.prototype.slice.call(arguments);var n=e.join(o.separator);n=n?o.prependHash+n.replace(h,"")+o.appendHash:n;return n}function S(e){e=encodeURI(e);if(v&&m){e=e.replace(/\?/,"%3F")}return e}o={VERSION:"1.2.0",raw:false,appendHash:"",prependHash:"/",separator:"/",changed:new r,stopped:new r,initialized:new r,init:function(){if(f)return;s=E();if(g){I(n,"hashchange",u)}else{if(w){if(!l){L()}b()}c=setInterval(u,t)}f=true;o.initialized.dispatch(y(s))},stop:function(){if(!f)return;if(g){U(n,"hashchange",u)}else{clearInterval(c);c=null}f=false;o.stopped.dispatch(y(s))},isActive:function(){return f},getURL:function(){return n.location.href},getBaseURL:function(){return o.getURL().replace(d,"")},setHash:function(e){var t;e=z.apply(null,arguments);if(e!==s){t=x(e);if(!o.raw){e=S(e)}n.location.hash="#"+e;t&&t()}},replaceHash:function(e){var t,i=n.location.href,a=i.indexOf("#");e=z.apply(null,arguments);if(e!==s){t=x(e);if(!o.raw){e=S(e)}if(a!==-1){i=i.slice(0,a)}n.location.replace(i+"#"+e);t&&t()}},getHash:function(){return y(s)},getHashAsArray:function(){return o.getHash().split(o.separator)},dispose:function(){o.stop();o.initialized.dispose();o.stopped.dispose();o.changed.dispose();l=o=n.hasher=null},toString:function(){return'[hasher version="'+o.VERSION+'" hash="'+o.getHash()+'"]'}};o.initialized.memorize=true;return o}(window);return n};if(typeof define==="function"&&define.amd){define(["signals"],e)}else if(typeof exports==="object"){module.exports=e(require("signals"))}else{window["hasher"]=e(window["signals"])}})();