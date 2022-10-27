var ae=Object.defineProperty;var se=(f,e,o)=>e in f?ae(f,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):f[e]=o;var E=(f,e,o)=>(se(f,typeof e!="symbol"?e+"":e,o),o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const u of document.querySelectorAll('link[rel="modulepreload"]'))s(u);new MutationObserver(u=>{for(const g of u)if(g.type==="childList")for(const p of g.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function o(u){const g={};return u.integrity&&(g.integrity=u.integrity),u.referrerpolicy&&(g.referrerPolicy=u.referrerpolicy),u.crossorigin==="use-credentials"?g.credentials="include":u.crossorigin==="anonymous"?g.credentials="omit":g.credentials="same-origin",g}function s(u){if(u.ep)return;u.ep=!0;const g=o(u);fetch(u.href,g)}})();class U{constructor(e,o){E(this,"nav");E(this,"options");E(this,"controls");E(this,"menus");E(this,"focusables");this.nav=e,this.options={animate:!0,duration:300,useArrowKeys:!0,closeOnBlur:!0,bodyClass:"a11y-nav-menu-open",focusOnOpen:!0},this.controls=this.getControls(),this.menus=this.controls.map(s=>s.menu),this.focusables=this.getFocusables(),this.options={...this.options,...o},this.onButtonClick=this.onButtonClick.bind(this),this.onButtonKeyDown=this.onButtonKeyDown.bind(this),this.onFocusableKeyDown=this.onFocusableKeyDown.bind(this),this.onBlur=this.onBlur.bind(this),this.init()}init(){this.controls.forEach(e=>{e.menu.el.classList.add("a11y-nav-menu"),e.menu.el.setAttribute("tabindex","-1"),e.el.addEventListener("click",this.onButtonClick),e.el.addEventListener("keydown",this.onButtonKeyDown),e.el.getAttribute("aria-expanded")==="true"&&this.openMenu(e.menu,!0)}),this.focusables.forEach(e=>{e.addEventListener("keydown",this.onFocusableKeyDown)}),this.options.closeOnBlur&&this.nav.addEventListener("focusout",this.onBlur)}onButtonClick(e){const o=e.currentTarget,s=this.controls.find(g=>g.el===o),u=(s==null?void 0:s.el.getAttribute("aria-expanded"))==="true";s!=null&&s.menu&&this.toggleMenu(s.menu,!u)}onButtonKeyDown(e){var u;const o=this.getControlFromEl(e.target);if(!o)return;const s=o.el.getAttribute("aria-expanded")==="true";if(e.key==="Escape")if(s)this.closeMenu(o.menu);else{const g=o.el.closest(".a11y-nav-active");if(g){const p=this.getMenuFromEl(g);p?(p.control.el.focus(),this.closeMenu(p)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}else if(e.key==="ArrowDown"&&s)e.preventDefault(),(u=o.menu.el.querySelector("a, button"))==null||u.focus();else{const g=this.focusables.filter(l=>this.getMenuDepthFromEl(l)===this.getMenuDepthFromEl(o.el)),p=g.findIndex(l=>l===o.el);this.options.useArrowKeys&&this.controlFocusByKey(e,g.map(l=>l),p)}}onFocusableKeyDown(e){const o=e.target,s=this.getFocusableFromEl(o);if(s){if(this.controls.find(p=>p.el===s))return;if(e.key==="Escape"){const p=s.closest(".a11y-nav-active");if(p){const l=this.getMenuFromEl(p);l?(l.control.el.focus(),this.closeMenu(l)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}}else return;const u=this.focusables.filter(p=>this.getMenuDepthFromEl(p)===this.getMenuDepthFromEl(s)),g=u.findIndex(p=>p===s);this.options.useArrowKeys&&this.controlFocusByKey(e,u.map(p=>p),g)}onBlur(e){!this.nav.contains(e.relatedTarget)&&!!this.nav.querySelector(".a11y-nav-active")&&this.closeAllMenus()}controlFocusByKey(e,o,s){switch(e.key){case"ArrowUp":case"ArrowLeft":if(e.preventDefault(),s>-1){const u=Math.max(0,s-1);o[u].focus()}break;case"ArrowDown":case"ArrowRight":if(e.preventDefault(),s>-1){const u=Math.min(o.length-1,s+1);o[u].focus()}break}}toggleMenu(e,o){o?this.openMenu(e):this.closeMenu(e)}openMenu(e,o=!1){var s;this.menus.forEach(u=>{u.el!==e.el&&u.el.classList.contains("a11y-nav-active")&&this.getMenuDepthFromEl(u.el)===this.getMenuDepthFromEl(e.el)&&this.closeMenu(u)}),e.el.classList.add("a11y-nav-active"),e.control.el.setAttribute("aria-expanded","true"),(s=e.el.parentElement)==null||s.classList.add("a11y-nav-child-open"),typeof this.options.bodyClass=="string"&&this.options.bodyClass.length>0&&document.body.classList.add(this.options.bodyClass),this.options.animate?(e.el.classList.add("a11y-nav-animate-in"),!o&&this.options.focusOnOpen&&setTimeout(()=>{e.el.focus({preventScroll:!0})},this.options.duration)):!o&&this.options.focusOnOpen&&e.el.focus({preventScroll:!0})}closeMenu(e){var s;if(!e.el.classList.contains("a11y-nav-active"))return;e.el.querySelectorAll(".a11y-nav-menu").forEach(u=>{const g=this.getMenuFromEl(u);g&&this.closeMenu(g)});const o=this.menus.some(u=>u.el.classList.contains("a11y-nav-active")&&u.el!==e.el);typeof this.options.bodyClass=="string"&&!o&&document.body.classList.remove(this.options.bodyClass),e.control.el.setAttribute("aria-expanded","false"),this.options.animate?(e.el.classList.remove("a11y-nav-animate-in"),e.el.classList.add("a11y-nav-animate-out"),setTimeout(()=>{var u;e.el.classList.remove("a11y-nav-active"),e.el.classList.remove("a11y-nav-animate-out"),(u=e.el.parentElement)==null||u.classList.remove("a11y-nav-child-open")},this.options.duration)):(e.el.classList.remove("a11y-nav-active"),(s=e.el.parentElement)==null||s.classList.remove("a11y-nav-child-open"))}closeAllMenus(){this.menus.forEach(e=>{this.closeMenu(e)}),typeof this.options.bodyClass=="string"&&document.body.classList.remove(this.options.bodyClass)}getMenuDepthFromEl(e){let o=0,s=e.parentElement;for(;s&&s!==this.nav;)(s.classList.contains("a11y-nav-menu")||s===this.nav)&&o++,s=s.parentElement;return o}getMenuFromEl(e){var o;return(o=this.menus.find(s=>s.el===e))!=null?o:null}getControlFromEl(e){var o;return(o=this.controls.find(s=>s.el===e))!=null?o:null}getFocusableFromEl(e){var o;return(o=this.focusables.find(s=>s===e))!=null?o:null}getControls(){return Array.from(this.nav.querySelectorAll("button[aria-expanded][aria-controls]")).map(e=>{const o=e.getAttribute("aria-controls"),s=document.getElementById(o!=null?o:"");if(s){const u={el:e,menu:{el:s,id:s.id,hadTabIndex:s.hasAttribute("tabindex")}};return u.menu.control=u,u}else return null}).flatMap(e=>e?[e]:[])}getFocusables(){return Array.from(this.nav.querySelectorAll("a, button"))}destroy(){this.closeAllMenus(),this.controls.forEach(e=>{e.menu.el.classList.remove("a11y-nav-menu"),e.menu.hadTabIndex||e.menu.el.removeAttribute("tabindex"),e.el.removeEventListener("click",this.onButtonClick),e.el.removeEventListener("keydown",this.onButtonKeyDown)}),this.focusables.forEach(e=>{e.removeEventListener("keydown",this.onFocusableKeyDown)}),this.nav.removeEventListener("focusout",this.onBlur)}}var W=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},N={exports:{}};(function(f){var e=typeof window<"u"?window:typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:{};/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */var o=function(s){var u=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,g=0,p={},l={manual:s.Prism&&s.Prism.manual,disableWorkerMessageHandler:s.Prism&&s.Prism.disableWorkerMessageHandler,util:{encode:function n(t){return t instanceof w?new w(t.type,n(t.content),t.alias):Array.isArray(t)?t.map(n):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(n){return Object.prototype.toString.call(n).slice(8,-1)},objId:function(n){return n.__id||Object.defineProperty(n,"__id",{value:++g}),n.__id},clone:function n(t,a){a=a||{};var r,i;switch(l.util.type(t)){case"Object":if(i=l.util.objId(t),a[i])return a[i];r={},a[i]=r;for(var c in t)t.hasOwnProperty(c)&&(r[c]=n(t[c],a));return r;case"Array":return i=l.util.objId(t),a[i]?a[i]:(r=[],a[i]=r,t.forEach(function(h,d){r[d]=n(h,a)}),r);default:return t}},getLanguage:function(n){for(;n;){var t=u.exec(n.className);if(t)return t[1].toLowerCase();n=n.parentElement}return"none"},setLanguage:function(n,t){n.className=n.className.replace(RegExp(u,"gi"),""),n.classList.add("language-"+t)},currentScript:function(){if(typeof document>"u")return null;if("currentScript"in document&&1<2)return document.currentScript;try{throw new Error}catch(r){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(n){var t=document.getElementsByTagName("script");for(var a in t)if(t[a].src==n)return t[a]}return null}},isActive:function(n,t,a){for(var r="no-"+t;n;){var i=n.classList;if(i.contains(t))return!0;if(i.contains(r))return!1;n=n.parentElement}return!!a}},languages:{plain:p,plaintext:p,text:p,txt:p,extend:function(n,t){var a=l.util.clone(l.languages[n]);for(var r in t)a[r]=t[r];return a},insertBefore:function(n,t,a,r){r=r||l.languages;var i=r[n],c={};for(var h in i)if(i.hasOwnProperty(h)){if(h==t)for(var d in a)a.hasOwnProperty(d)&&(c[d]=a[d]);a.hasOwnProperty(h)||(c[h]=i[h])}var m=r[n];return r[n]=c,l.languages.DFS(l.languages,function(v,x){x===m&&v!=n&&(this[v]=c)}),c},DFS:function n(t,a,r,i){i=i||{};var c=l.util.objId;for(var h in t)if(t.hasOwnProperty(h)){a.call(t,h,t[h],r||h);var d=t[h],m=l.util.type(d);m==="Object"&&!i[c(d)]?(i[c(d)]=!0,n(d,a,null,i)):m==="Array"&&!i[c(d)]&&(i[c(d)]=!0,n(d,a,h,i))}}},plugins:{},highlightAll:function(n,t){l.highlightAllUnder(document,n,t)},highlightAllUnder:function(n,t,a){var r={callback:a,container:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};l.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),l.hooks.run("before-all-elements-highlight",r);for(var i=0,c;c=r.elements[i++];)l.highlightElement(c,t===!0,r.callback)},highlightElement:function(n,t,a){var r=l.util.getLanguage(n),i=l.languages[r];l.util.setLanguage(n,r);var c=n.parentElement;c&&c.nodeName.toLowerCase()==="pre"&&l.util.setLanguage(c,r);var h=n.textContent,d={element:n,language:r,grammar:i,code:h};function m(x){d.highlightedCode=x,l.hooks.run("before-insert",d),d.element.innerHTML=d.highlightedCode,l.hooks.run("after-highlight",d),l.hooks.run("complete",d),a&&a.call(d.element)}if(l.hooks.run("before-sanity-check",d),c=d.element.parentElement,c&&c.nodeName.toLowerCase()==="pre"&&!c.hasAttribute("tabindex")&&c.setAttribute("tabindex","0"),!d.code){l.hooks.run("complete",d),a&&a.call(d.element);return}if(l.hooks.run("before-highlight",d),!d.grammar){m(l.util.encode(d.code));return}if(t&&s.Worker){var v=new Worker(l.filename);v.onmessage=function(x){m(x.data)},v.postMessage(JSON.stringify({language:d.language,code:d.code,immediateClose:!0}))}else m(l.highlight(d.code,d.grammar,d.language))},highlight:function(n,t,a){var r={code:n,grammar:t,language:a};if(l.hooks.run("before-tokenize",r),!r.grammar)throw new Error('The language "'+r.language+'" has no grammar.');return r.tokens=l.tokenize(r.code,r.grammar),l.hooks.run("after-tokenize",r),w.stringify(l.util.encode(r.tokens),r.language)},tokenize:function(n,t){var a=t.rest;if(a){for(var r in a)t[r]=a[r];delete t.rest}var i=new J;return M(i,i.head,n),z(n,i,t,i.head,0),Q(i)},hooks:{all:{},add:function(n,t){var a=l.hooks.all;a[n]=a[n]||[],a[n].push(t)},run:function(n,t){var a=l.hooks.all[n];if(!(!a||!a.length))for(var r=0,i;i=a[r++];)i(t)}},Token:w};s.Prism=l;function w(n,t,a,r){this.type=n,this.content=t,this.alias=a,this.length=(r||"").length|0}w.stringify=function n(t,a){if(typeof t=="string")return t;if(Array.isArray(t)){var r="";return t.forEach(function(m){r+=n(m,a)}),r}var i={type:t.type,content:n(t.content,a),tag:"span",classes:["token",t.type],attributes:{},language:a},c=t.alias;c&&(Array.isArray(c)?Array.prototype.push.apply(i.classes,c):i.classes.push(c)),l.hooks.run("wrap",i);var h="";for(var d in i.attributes)h+=" "+d+'="'+(i.attributes[d]||"").replace(/"/g,"&quot;")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+h+">"+i.content+"</"+i.tag+">"};function T(n,t,a,r){n.lastIndex=t;var i=n.exec(a);if(i&&r&&i[1]){var c=i[1].length;i.index+=c,i[0]=i[0].slice(c)}return i}function z(n,t,a,r,i,c){for(var h in a)if(!(!a.hasOwnProperty(h)||!a[h])){var d=a[h];d=Array.isArray(d)?d:[d];for(var m=0;m<d.length;++m){if(c&&c.cause==h+","+m)return;var v=d[m],x=v.inside,q=!!v.lookbehind,j=!!v.greedy,V=v.alias;if(j&&!v.pattern.global){var ee=v.pattern.toString().match(/[imsuy]*$/)[0];v.pattern=RegExp(v.pattern.source,ee+"g")}for(var R=v.pattern||v,y=r.next,F=i;y!==t.tail&&!(c&&F>=c.reach);F+=y.value.length,y=y.next){var k=y.value;if(t.length>n.length)return;if(!(k instanceof w)){var C=1,b;if(j){if(b=T(R,F,n,q),!b||b.index>=n.length)break;var L=b.index,te=b.index+b[0].length,A=F;for(A+=y.value.length;L>=A;)y=y.next,A+=y.value.length;if(A-=y.value.length,F=A,y.value instanceof w)continue;for(var $=y;$!==t.tail&&(A<te||typeof $.value=="string");$=$.next)C++,A+=$.value.length;C--,k=n.slice(F,A),b.index-=F}else if(b=T(R,0,k,q),!b)continue;var L=b.index,S=b[0],O=k.slice(0,L),Z=k.slice(L+S.length),_=F+k.length;c&&_>c.reach&&(c.reach=_);var D=y.prev;O&&(D=M(t,D,O),F+=O.length),X(t,D,C);var ne=new w(h,x?l.tokenize(S,x):S,V,S);if(y=M(t,D,ne),Z&&M(t,y,Z),C>1){var I={cause:h+","+m,reach:_};z(n,t,a,y.prev,F,I),c&&I.reach>c.reach&&(c.reach=I.reach)}}}}}}function J(){var n={value:null,prev:null,next:null},t={value:null,prev:n,next:null};n.next=t,this.head=n,this.tail=t,this.length=0}function M(n,t,a){var r=t.next,i={value:a,prev:t,next:r};return t.next=i,r.prev=i,n.length++,i}function X(n,t,a){for(var r=t.next,i=0;i<a&&r!==n.tail;i++)r=r.next;t.next=r,r.prev=t,n.length-=i}function Q(n){for(var t=[],a=n.head.next;a!==n.tail;)t.push(a.value),a=a.next;return t}if(!s.document)return s.addEventListener&&(l.disableWorkerMessageHandler||s.addEventListener("message",function(n){var t=JSON.parse(n.data),a=t.language,r=t.code,i=t.immediateClose;s.postMessage(l.highlight(r,l.languages[a],a)),i&&s.close()},!1)),l;var P=l.util.currentScript();P&&(l.filename=P.src,P.hasAttribute("data-manual")&&(l.manual=!0));function B(){l.manual||l.highlightAll()}if(!l.manual){var K=document.readyState;K==="loading"||K==="interactive"&&P&&P.defer?document.addEventListener("DOMContentLoaded",B):window.requestAnimationFrame?window.requestAnimationFrame(B):window.setTimeout(B,16)}return l}(e);f.exports&&(f.exports=o),typeof W<"u"&&(W.Prism=o)})(N);const Y=N.exports;Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]};Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity;Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup;Prism.hooks.add("wrap",function(f){f.type==="entity"&&(f.attributes.title=f.content.replace(/&amp;/,"&"))});Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,o){var s={};s["language-"+o]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[o]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var u={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};u["language-"+o]={pattern:/[\s\S]+/,inside:Prism.languages[o]};var g={};g[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:u},Prism.languages.insertBefore("markup","cdata",g)}});Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(f,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+f+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}});Prism.languages.html=Prism.languages.markup;Prism.languages.mathml=Prism.languages.markup;Prism.languages.svg=Prism.languages.markup;Prism.languages.xml=Prism.languages.extend("markup",{});Prism.languages.ssml=Prism.languages.xml;Prism.languages.atom=Prism.languages.xml;Prism.languages.rss=Prism.languages.xml;(function(f){var e=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;f.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+e.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+e.source+"$"),alias:"url"}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+e.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:e,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},f.languages.css.atrule.inside.rest=f.languages.css;var o=f.languages.markup;o&&(o.tag.addInlined("style","css"),o.tag.addAttribute("style","css"))})(Prism);Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/};Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source)+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/});Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/});Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}});Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}});Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript"));Prism.languages.js=Prism.languages.javascript;(function(){typeof Prism>"u"||typeof document>"u"||(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Prism.plugins.UnescapedMarkup=!0,Prism.hooks.add("before-highlightall",function(f){f.selector+=', [class*="lang-"] script[type="text/plain"], [class*="language-"] script[type="text/plain"], script[type="text/plain"][class*="lang-"], script[type="text/plain"][class*="language-"]'}),Prism.hooks.add("before-sanity-check",function(f){var e=f.element;if(e.matches('script[type="text/plain"]')){var o=document.createElement("code"),s=document.createElement("pre");s.className=o.className=e.className;var u=e.dataset;Object.keys(u||{}).forEach(function(p){Object.prototype.hasOwnProperty.call(u,p)&&(s.dataset[p]=u[p])}),o.textContent=f.code=f.code.replace(/&lt;\/script(?:>|&gt;)/gi,"<\/script>"),s.appendChild(o),e.parentNode.replaceChild(s,e),f.element=o;return}if(!f.code){var g=e.childNodes;g.length===1&&g[0].nodeName=="#comment"&&(e.textContent=f.code=g[0].textContent)}}))})();Y.manual=!0;Y.highlightAll();const G=document.querySelector(".main-nav"),H=document.querySelector(".rail-nav");G&&new U(G);H&&new U(H);