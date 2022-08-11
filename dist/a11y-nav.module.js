function t(){return t=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},t.apply(this,arguments)}var e=/*#__PURE__*/function(){function e(e,n){this.nav=void 0,this.options=void 0,this.controls=void 0,this.menus=void 0,this.focusables=void 0,this.nav=e,this.options={animate:!0,duration:300,useArrowKeys:!0,closeOnBlur:!0,bodyClass:"a11y-nav-menu-open"},this.controls=this.getControls(),this.menus=this.controls.map(function(t){return t.menu}),this.focusables=this.getFocusables(),this.options=t({},this.options,n),this.onButtonClick=this.onButtonClick.bind(this),this.onButtonKeyDown=this.onButtonKeyDown.bind(this),this.onFocusableKeyDown=this.onFocusableKeyDown.bind(this),this.onBlur=this.onBlur.bind(this),this.init()}var n=e.prototype;return n.init=function(){var t=this;this.controls.forEach(function(e){e.menu.el.classList.add("a11y-nav-menu"),e.menu.el.setAttribute("tabindex","-1"),e.el.addEventListener("click",t.onButtonClick),e.el.addEventListener("keydown",t.onButtonKeyDown),"true"===e.el.getAttribute("aria-expanded")&&t.openMenu(e.menu)}),this.focusables.forEach(function(e){e.addEventListener("keydown",t.onFocusableKeyDown)}),this.options.closeOnBlur&&this.nav.addEventListener("focusout",this.onBlur)},n.onButtonClick=function(t){var e=t.currentTarget,n=this.controls.find(function(t){return t.el===e}),o="true"===(null==n?void 0:n.el.getAttribute("aria-expanded"));null!=n&&n.menu&&this.toggleMenu(n.menu,!o)},n.onButtonKeyDown=function(t){var e=this,n=this.getControlFromEl(t.target);if(n){var o="true"===n.el.getAttribute("aria-expanded");if("Escape"===t.key)if(o)this.closeMenu(n.menu);else{var s=n.el.closest(".a11y-nav-active");if(s){var i=this.getMenuFromEl(s);i?(i.control.el.focus(),this.closeMenu(i)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}else if("ArrowDown"===t.key&&o){var l;t.preventDefault(),null==(l=n.menu.el.querySelector("a, button"))||l.focus()}else{var r=this.focusables.filter(function(t){return e.getMenuDepthFromEl(t)===e.getMenuDepthFromEl(n.el)}),a=r.findIndex(function(t){return t===n.el});this.options.useArrowKeys&&this.controlFocusByKey(t,r.map(function(t){return t}),a)}}},n.onFocusableKeyDown=function(t){var e=this,n=this.getFocusableFromEl(t.target);if(n&&!this.controls.find(function(t){return t.el===n})){if("Escape"===t.key){var o=n.closest(".a11y-nav-active");if(o){var s=this.getMenuFromEl(o);s?(s.control.el.focus(),this.closeMenu(s)):(this.focusables[0].focus(),this.closeAllMenus())}else this.focusables[0].focus(),this.closeAllMenus()}var i=this.focusables.filter(function(t){return e.getMenuDepthFromEl(t)===e.getMenuDepthFromEl(n)}),l=i.findIndex(function(t){return t===n});this.options.useArrowKeys&&this.controlFocusByKey(t,i.map(function(t){return t}),l)}},n.onBlur=function(t){!this.nav.contains(t.relatedTarget)&&this.nav.querySelector(".a11y-nav-active")&&this.closeAllMenus()},n.controlFocusByKey=function(t,e,n){switch(t.key){case"ArrowUp":case"ArrowLeft":t.preventDefault(),n>-1&&e[Math.max(0,n-1)].focus();break;case"ArrowDown":case"ArrowRight":t.preventDefault(),n>-1&&e[Math.min(e.length-1,n+1)].focus()}},n.toggleMenu=function(t,e){e?this.openMenu(t):this.closeMenu(t)},n.openMenu=function(t){var e,n=this;this.menus.forEach(function(e){e!==t&&n.getMenuDepthFromEl(e.el)===n.getMenuDepthFromEl(t.el)&&n.closeMenu(e)}),t.el.classList.add("a11y-nav-active"),t.control.el.setAttribute("aria-expanded","true"),null==(e=t.el.parentElement)||e.classList.add("a11y-nav-child-open"),"string"==typeof this.options.bodyClass&&this.options.bodyClass.length>0&&document.body.classList.add(this.options.bodyClass),this.options.animate&&t.el.classList.add("a11y-nav-animate-in")},n.closeMenu=function(t){var e,n=this;t.el.querySelectorAll(".a11y-nav-menu").forEach(function(t){var e=n.getMenuFromEl(t);e&&n.closeMenu(e)}),"string"==typeof this.options.bodyClass&&document.body.classList.remove(this.options.bodyClass),t.control.el.setAttribute("aria-expanded","false"),this.options.animate?(t.el.classList.remove("a11y-nav-animate-in"),t.el.classList.add("a11y-nav-animate-out"),setTimeout(function(){var e;t.el.classList.remove("a11y-nav-active"),t.el.classList.remove("a11y-nav-animate-out"),null==(e=t.el.parentElement)||e.classList.remove("a11y-nav-child-open")},this.options.duration)):(t.el.classList.remove("a11y-nav-active"),null==(e=t.el.parentElement)||e.classList.remove("a11y-nav-child-open"))},n.closeAllMenus=function(){var t=this;this.menus.forEach(function(e){t.closeMenu(e)})},n.getMenuDepthFromEl=function(t){for(var e=0,n=t.parentElement;n&&n!==this.nav;)(n.classList.contains("a11y-nav-menu")||n===this.nav)&&e++,n=n.parentElement;return e},n.getMenuFromEl=function(t){var e;return null!=(e=this.menus.find(function(e){return e.el===t}))?e:null},n.getControlFromEl=function(t){var e;return null!=(e=this.controls.find(function(e){return e.el===t}))?e:null},n.getFocusableFromEl=function(t){var e;return null!=(e=this.focusables.find(function(e){return e===t}))?e:null},n.getControls=function(){return Array.from(this.nav.querySelectorAll("button[aria-expanded][aria-controls]")).map(function(t){var e=t.getAttribute("aria-controls"),n=document.getElementById(null!=e?e:"");if(n){var o={el:t,menu:{el:n,id:n.id,hadTabIndex:n.hasAttribute("tabindex")}};return o.menu.control=o,o}return null}).flatMap(function(t){return t?[t]:[]})},n.getFocusables=function(){return Array.from(this.nav.querySelectorAll("a, button"))},n.destroy=function(){var t=this;this.closeAllMenus(),this.controls.forEach(function(e){e.menu.el.classList.remove("a11y-nav-menu"),e.menu.hadTabIndex||e.menu.el.removeAttribute("tabindex"),e.el.removeEventListener("click",t.onButtonClick),e.el.removeEventListener("keydown",t.onButtonKeyDown)}),this.focusables.forEach(function(e){e.removeEventListener("keydown",t.onFocusableKeyDown)}),this.nav.removeEventListener("focusout",this.onBlur)},e}();export{e as default};
