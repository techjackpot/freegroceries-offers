
/* aweber form */	
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//forms.aweber.com/form/69/81415869.js";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "aweber-wjs-dxhpz2jyk"));
/* aweber form */

window.onload=function(){
	jcf.customForms.replaceAll();
}

// page init
jQuery(document).ready(function($){
	jQuery('.visual-section .btn').click(function(){
		jQuery(window).scrollTo(this.hash, 750);
		return false;
	});
	initSlideShow();

	// MatchHeight
	// $('.offer').matchHeight({ property: 'min-height' });
	$('.offer-thumb, .offer-text, .offer-btn-holder').matchHeight({ property: 'min-height' });
});

// fade gallery init
function initSlideShow() {
	jQuery('div#visual').fadeGallery({
		slides: 'div.gmask > ul > li',
		btnPrev: 'a.prev',
		btnNext: 'a.next',
		pagerLinks: '.pagination li',
		event: 'click',
		autoRotation: true,
		switchTime: 3000,
		autoHeight: true,
		animSpeed: 500
	});
}
/*
 * JavaScript Custom Forms Module
 */
jcf = {
	// global options
	modules: {},
	plugins: {},
	baseOptions: {
		useNativeDropOnMobileDevices: true,
		unselectableClass:'jcf-unselectable',
		labelActiveClass:'jcf-label-active',
		labelDisabledClass:'jcf-label-disabled',
		classPrefix: 'jcf-class-',
		hiddenClass:'jcf-hidden',
		focusClass:'jcf-focus',
		wrapperTag: 'div'
	},
	// replacer function
	customForms: {
		setOptions: function(obj) {
			for(var p in obj) {
				if(obj.hasOwnProperty(p) && typeof obj[p] === 'object') {
					jcf.lib.extend(jcf.modules[p].prototype.defaultOptions, obj[p]);
				}
			}
		},
		replaceAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						// refresh form element state
						els[i].jcf.refreshState();
					} else {
						// replace form element
						if(!jcf.lib.hasClass(els[i], 'default') && jcf.modules[k].prototype.checkElement(els[i])) {
							new jcf.modules[k]({
								replaces:els[i]
							});
						}
					}
				}
			}
		},
		refreshAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						// refresh form element state
						els[i].jcf.refreshState();
					}
				}
			}
		},
		refreshElement: function(obj) {
			if(obj && obj.jcf) {
				obj.jcf.refreshState();
			}
		},
		destroyAll: function() {
			for(var k in jcf.modules) {
				var els = jcf.lib.queryBySelector(jcf.modules[k].prototype.selector);
				for(var i = 0; i<els.length; i++) {
					if(els[i].jcf) {
						els[i].jcf.destroy();
					}
				}
			}
		}
	},
	// detect device type
	isTouchDevice: (function() {
		try {
			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		} catch (e) {
			return false;
		}
	}()),
	// define base module
	setBaseModule: function(obj) {
		jcf.customControl = function(opt){
			this.options = jcf.lib.extend({}, jcf.baseOptions, this.defaultOptions, opt);
			this.init();
		};
		for(var p in obj) {
			jcf.customControl.prototype[p] = obj[p];
		}
	},
	// add module to jcf.modules
	addModule: function(obj) {
		if(obj.name){
			// create new module proto class
			jcf.modules[obj.name] = function(){
				jcf.modules[obj.name].superclass.constructor.apply(this, arguments);
			};
			jcf.lib.inherit(jcf.modules[obj.name], jcf.customControl);
			for(var p in obj) {
				jcf.modules[obj.name].prototype[p] = obj[p];
			}
			// on create module
			jcf.modules[obj.name].prototype.onCreateModule();
			// make callback for exciting modules
			for(var mod in jcf.modules) {
				if(jcf.modules[mod] != jcf.modules[obj.name]) {
					jcf.modules[mod].prototype.onModuleAdded(jcf.modules[obj.name]);
				}
			}
		}
	},
	// add plugin to jcf.plugins
	addPlugin: function(obj) {
		if(obj && obj.name) {
			jcf.plugins[obj.name] = function() {
				this.init.apply(this, arguments);
			};
			for(var p in obj) {
				jcf.plugins[obj.name].prototype[p] = obj[p];
			}
		}
	},
	// miscellaneous init
	init: function(){
		if(navigator.msPointerEnabled) {
			this.eventPress = 'MSPointerDown';
			this.eventMove = 'MSPointerMove';
			this.eventRelease = 'MSPointerUp';
		} else {
			this.eventPress = this.isTouchDevice ? 'touchstart' : 'mousedown';
			this.eventMove = this.isTouchDevice ? 'touchmove' : 'mousemove';
			this.eventRelease = this.isTouchDevice ? 'touchend' : 'mouseup';
		}

		// init jcf styles
		setTimeout(function(){
			jcf.lib.domReady(function(){
				jcf.initStyles();
			});
		},1);
		return this;
	},
	initStyles: function() {
		// create <style> element and rules
		var head = document.getElementsByTagName('head')[0],
			style = document.createElement('style'),
			rules = document.createTextNode('.'+jcf.baseOptions.unselectableClass+'{'+
				'-moz-user-select:none;'+
				'-webkit-tap-highlight-color:rgba(255,255,255,0);'+
				'-webkit-user-select:none;'+
				'user-select:none;'+
			'}');

		// append style element
		style.type = 'text/css';
		if(style.styleSheet) {
			style.styleSheet.cssText = rules.nodeValue;
		} else {
			style.appendChild(rules);
		}
		head.appendChild(style);
	}
}.init();

/*
 * Custom Form Control prototype
 */
jcf.setBaseModule({
	init: function(){
		if(this.options.replaces) {
			this.realElement = this.options.replaces;
			this.realElement.jcf = this;
			this.replaceObject();
		}
	},
	defaultOptions: {
		// default module options (will be merged with base options)
	},
	checkElement: function(el){
		return true; // additional check for correct form element
	},
	replaceObject: function(){
		this.createWrapper();
		this.attachEvents();
		this.fixStyles();
		this.setupWrapper();
	},
	createWrapper: function(){
		this.fakeElement = jcf.lib.createElement(this.options.wrapperTag);
		this.labelFor = jcf.lib.getLabelFor(this.realElement);
		jcf.lib.disableTextSelection(this.fakeElement);
		jcf.lib.addClass(this.fakeElement, jcf.lib.getAllClasses(this.realElement.className, this.options.classPrefix));
		jcf.lib.addClass(this.realElement, jcf.baseOptions.hiddenClass);
	},
	attachEvents: function(){
		jcf.lib.event.add(this.realElement, 'focus', this.onFocusHandler, this);
		jcf.lib.event.add(this.realElement, 'blur', this.onBlurHandler, this);
		jcf.lib.event.add(this.fakeElement, 'click', this.onFakeClick, this);
		jcf.lib.event.add(this.fakeElement, jcf.eventPress, this.onFakePressed, this);
		jcf.lib.event.add(this.fakeElement, jcf.eventRelease, this.onFakeReleased, this);

		if(this.labelFor) {
			this.labelFor.jcf = this;
			jcf.lib.event.add(this.labelFor, 'click', this.onFakeClick, this);
			jcf.lib.event.add(this.labelFor, jcf.eventPress, this.onFakePressed, this);
			jcf.lib.event.add(this.labelFor, jcf.eventRelease, this.onFakeReleased, this);
		}
	},
	fixStyles: function() {
		// hide mobile webkit tap effect
		if(jcf.isTouchDevice) {
			var tapStyle = 'rgba(255,255,255,0)';
			this.realElement.style.webkitTapHighlightColor = tapStyle;
			this.fakeElement.style.webkitTapHighlightColor = tapStyle;
			if(this.labelFor) {
				this.labelFor.style.webkitTapHighlightColor = tapStyle;
			}
		}
	},
	setupWrapper: function(){
		// implement in subclass
	},
	refreshState: function(){
		// implement in subclass
	},
	destroy: function() {
		if(this.fakeElement && this.fakeElement.parentNode) {
			this.fakeElement.parentNode.removeChild(this.fakeElement);
		}
		jcf.lib.removeClass(this.realElement, jcf.baseOptions.hiddenClass);
		this.realElement.jcf = null;
	},
	onFocus: function(){
		// emulated focus event
		jcf.lib.addClass(this.fakeElement,this.options.focusClass);
	},
	onBlur: function(cb){
		// emulated blur event
		jcf.lib.removeClass(this.fakeElement,this.options.focusClass);
	},
	onFocusHandler: function() {
		// handle focus loses
		if(this.focused) return;
		this.focused = true;

		// handle touch devices also
		if(jcf.isTouchDevice) {
			if(jcf.focusedInstance && jcf.focusedInstance.realElement != this.realElement) {
				jcf.focusedInstance.onBlur();
				jcf.focusedInstance.realElement.blur();
			}
			jcf.focusedInstance = this;
		}
		this.onFocus.apply(this, arguments);
	},
	onBlurHandler: function() {
		// handle focus loses
		if(!this.pressedFlag) {
			this.focused = false;
			this.onBlur.apply(this, arguments);
		}
	},
	onFakeClick: function(){
		if(jcf.isTouchDevice) {
			this.onFocus();
		} else if(!this.realElement.disabled) {
			this.realElement.focus();
		}
	},
	onFakePressed: function(e){
		this.pressedFlag = true;
	},
	onFakeReleased: function(){
		this.pressedFlag = false;
	},
	onCreateModule: function(){
		// implement in subclass
	},
	onModuleAdded: function(module) {
		// implement in subclass
	},
	onControlReady: function() {
		// implement in subclass
	}
});

/*
 * JCF Utility Library
 */
jcf.lib = {
	bind: function(func, scope){
		return function() {
			return func.apply(scope, arguments);
		}
	},
	browser: (function() {
		var ua = navigator.userAgent.toLowerCase(), res = {},
		match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
				/(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];
		res[match[1]] = true;
		res.version = match[2] || "0";
		res.safariMac = ua.indexOf('mac') != -1 && ua.indexOf('safari') != -1;
		return res;
	})(),
	getOffset: function (obj) {
		if (obj.getBoundingClientRect && !navigator.msPointerEnabled) {
			var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
			var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
			return {
				top:Math.round(obj.getBoundingClientRect().top + scrollTop - clientTop),
				left:Math.round(obj.getBoundingClientRect().left + scrollLeft - clientLeft)
			}
		} else {
			var posLeft = 0, posTop = 0;
			while (obj.offsetParent) {posLeft += obj.offsetLeft; posTop += obj.offsetTop; obj = obj.offsetParent;}
			return {top:posTop,left:posLeft};
		}
	},
	getScrollTop: function() {
		return window.pageYOffset || document.documentElement.scrollTop;
	},
	getScrollLeft: function() {
		return window.pageXOffset || document.documentElement.scrollLeft;
	},
	getWindowWidth: function(){
		return document.compatMode=='CSS1Compat' ? document.documentElement.clientWidth : document.body.clientWidth;
	},
	getWindowHeight: function(){
		return document.compatMode=='CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;
	},
	getStyle: function(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	},
	getParent: function(obj, selector) {
		while(obj.parentNode && obj.parentNode != document.body) {
			if(obj.parentNode.tagName.toLowerCase() == selector.toLowerCase()) {
				return obj.parentNode;
			}
			obj = obj.parentNode;
		}
		return false;
	},
	isParent: function(child, parent) {
		while(child.parentNode) {
			if(child.parentNode === parent) {
				return true;
			}
			child = child.parentNode;
		}
		return false;
	},
	getLabelFor: function(object) {
		if(jcf.lib.getParent(object,'label')) {
			return object.parentNode;
		} else if(object.id) {
			return jcf.lib.queryBySelector('label[for="' + object.id + '"]')[0];
		}
	},
	disableTextSelection: function(el){
		if (typeof el.onselectstart !== 'undefined') {
			el.onselectstart = function() {return false};
		} else if(window.opera) {
			el.setAttribute('unselectable', 'on');
		} else {
			jcf.lib.addClass(el, jcf.baseOptions.unselectableClass);
		}
	},
	enableTextSelection: function(el) {
		if (typeof el.onselectstart !== 'undefined') {
			el.onselectstart = null;
		} else if(window.opera) {
			el.removeAttribute('unselectable');
		} else {
			jcf.lib.removeClass(el, jcf.baseOptions.unselectableClass);
		}
	},
	queryBySelector: function(selector, scope){
		return this.getElementsBySelector(selector, scope);
	},
	prevSibling: function(node) {
		while(node = node.previousSibling) if(node.nodeType == 1) break;
		return node;
	},
	nextSibling: function(node) {
		while(node = node.nextSibling) if(node.nodeType == 1) break;
		return node;
	},
	fireEvent: function(element,event) {
		if(element.dispatchEvent){
			var evt = document.createEvent('HTMLEvents');
			evt.initEvent(event, true, true );
			return !element.dispatchEvent(evt);
		}else if(document.createEventObject){
			var evt = document.createEventObject();
			return element.fireEvent('on'+event,evt);
		}
	},
	isParent: function(p, c) {
		while(c.parentNode) {
			if(p == c) {
				return true;
			}
			c = c.parentNode;
		}
		return false;
	},
	inherit: function(Child, Parent) {
		var F = function() { }
		F.prototype = Parent.prototype
		Child.prototype = new F()
		Child.prototype.constructor = Child
		Child.superclass = Parent.prototype
	},
	extend: function(obj) {
		for(var i = 1; i < arguments.length; i++) {
			for(var p in arguments[i]) {
				if(arguments[i].hasOwnProperty(p)) {
					obj[p] = arguments[i][p];
				}
			}
		}
		return obj;
	},
	hasClass: function (obj,cname) {
		return (obj.className ? obj.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')) : false);
	},
	addClass: function (obj,cname) {
		if (!this.hasClass(obj,cname)) obj.className += (!obj.className.length || obj.className.charAt(obj.className.length - 1) === ' ' ? '' : ' ') + cname;
	},
	removeClass: function (obj,cname) {
		if (this.hasClass(obj,cname)) obj.className=obj.className.replace(new RegExp('(\\s|^)'+cname+'(\\s|$)'),' ').replace(/\s+$/, '');
	},
	toggleClass: function(obj, cname, condition) {
		if(condition) this.addClass(obj, cname); else this.removeClass(obj, cname);
	},
	createElement: function(tagName, options) {
		var el = document.createElement(tagName);
		for(var p in options) {
			if(options.hasOwnProperty(p)) {
				switch (p) {
					case 'class': el.className = options[p]; break;
					case 'html': el.innerHTML = options[p]; break;
					case 'style': this.setStyles(el, options[p]); break;
					default: el.setAttribute(p, options[p]);
				}
			}
		}
		return el;
	},
	setStyles: function(el, styles) {
		for(var p in styles) {
			if(styles.hasOwnProperty(p)) {
				switch (p) {
					case 'float': el.style.cssFloat = styles[p]; break;
					case 'opacity': el.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity='+styles[p]*100+')'; el.style.opacity = styles[p]; break;
					default: el.style[p] = (typeof styles[p] === 'undefined' ? 0 : styles[p]) + (typeof styles[p] === 'number' ? 'px' : '');
				}
			}
		}
		return el;
	},
	getInnerWidth: function(el) {
		return el.offsetWidth - (parseInt(this.getStyle(el,'paddingLeft')) || 0) - (parseInt(this.getStyle(el,'paddingRight')) || 0);
	},
	getInnerHeight: function(el) {
		return el.offsetHeight - (parseInt(this.getStyle(el,'paddingTop')) || 0) - (parseInt(this.getStyle(el,'paddingBottom')) || 0);
	},
	getAllClasses: function(cname, prefix, skip) {
		if(!skip) skip = '';
		if(!prefix) prefix = '';
		return cname ? cname.replace(new RegExp('(\\s|^)'+skip+'(\\s|$)'),' ').replace(/[\s]*([\S]+)+[\s]*/gi,prefix+"$1 ") : '';
	},
	getElementsBySelector: function(selector, scope) {
		if(typeof document.querySelectorAll === 'function') {
			return (scope || document).querySelectorAll(selector);
		}
		var selectors = selector.split(',');
		var resultList = [];
		for(var s = 0; s < selectors.length; s++) {
			var currentContext = [scope || document];
			var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
			for (var i = 0; i < tokens.length; i++) {
				token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
				if (token.indexOf('#') > -1) {
					var bits = token.split('#'), tagName = bits[0], id = bits[1];
					var element = document.getElementById(id);
					if (tagName && element.nodeName.toLowerCase() != tagName) {
						return [];
					}
					currentContext = [element];
					continue;
				}
				if (token.indexOf('.') > -1) {
					var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; j < elements.length; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
					var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
					if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
						attrName = 'htmlFor';
					}
					var found = [], foundCount = 0;
					for (var h = 0; h < currentContext.length; h++) {
						var elements;
						if (tagName == '*') {
							elements = currentContext[h].getElementsByTagName('*');
						} else {
							elements = currentContext[h].getElementsByTagName(tagName);
						}
						for (var j = 0; elements[j]; j++) {
							found[foundCount++] = elements[j];
						}
					}
					currentContext = [];
					var currentContextIndex = 0, checkFunction;
					switch (attrOperator) {
						case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
						case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
						case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
						case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
						case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
						case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
						default : checkFunction = function(e) { return e.getAttribute(attrName) };
					}
					currentContext = [];
					var currentContextIndex = 0;
					for (var k = 0; k < found.length; k++) {
						if (checkFunction(found[k])) {
							currentContext[currentContextIndex++] = found[k];
						}
					}
					continue;
				}
				tagName = token;
				var found = [], foundCount = 0;
				for (var h = 0; h < currentContext.length; h++) {
					var elements = currentContext[h].getElementsByTagName(tagName);
					for (var j = 0; j < elements.length; j++) {
						found[foundCount++] = elements[j];
					}
				}
				currentContext = found;
			}
			resultList = [].concat(resultList,currentContext);
		}
		return resultList;
	},
	scrollSize: (function(){
		var content, hold, sizeBefore, sizeAfter;
		function buildSizer(){
			if(hold) removeSizer();
			content = document.createElement('div');
			hold = document.createElement('div');
			hold.style.cssText = 'position:absolute;overflow:hidden;width:100px;height:100px';
			hold.appendChild(content);
			document.body.appendChild(hold);
		}
		function removeSizer(){
			document.body.removeChild(hold);
			hold = null;
		}
		function calcSize(vertical) {
			buildSizer();
			content.style.cssText = 'height:'+(vertical ? '100%' : '200px');
			sizeBefore = (vertical ? content.offsetHeight : content.offsetWidth);
			hold.style.overflow = 'scroll'; content.innerHTML = 1;
			sizeAfter = (vertical ? content.offsetHeight : content.offsetWidth);
			if(vertical && hold.clientHeight) sizeAfter = hold.clientHeight;
			removeSizer();
			return sizeBefore - sizeAfter;
		}
		return {
			getWidth:function(){
				return calcSize(false);
			},
			getHeight:function(){
				return calcSize(true)
			}
		}
	}()),
	domReady: function (handler){
		var called = false
		function ready() {
			if (called) return;
			called = true;
			handler();
		}
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", ready, false);
		} else if (document.attachEvent) {
			if (document.documentElement.doScroll && window == window.top) {
				function tryScroll(){
					if (called) return
					if (!document.body) return
					try {
						document.documentElement.doScroll("left")
						ready()
					} catch(e) {
						setTimeout(tryScroll, 0)
					}
				}
				tryScroll()
			}
			document.attachEvent("onreadystatechange", function(){
				if (document.readyState === "complete") {
					ready()
				}
			})
		}
		if (window.addEventListener) window.addEventListener('load', ready, false)
		else if (window.attachEvent) window.attachEvent('onload', ready)
	},
	event: (function(){
		var guid = 0;
		function fixEvent(e) {
			e = e || window.event;
			if (e.isFixed) {
				return e;
			}
			e.isFixed = true;
			e.preventDefault = e.preventDefault || function(){this.returnValue = false}
			e.stopPropagation = e.stopPropagaton || function(){this.cancelBubble = true}
			if (!e.target) {
				e.target = e.srcElement
			}
			if (!e.relatedTarget && e.fromElement) {
				e.relatedTarget = e.fromElement == e.target ? e.toElement : e.fromElement;
			}
			if (e.pageX == null && e.clientX != null) {
				var html = document.documentElement, body = document.body;
				e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
				e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
			}
			if (!e.which && e.button) {
				e.which = e.button & 1 ? 1 : (e.button & 2 ? 3 : (e.button & 4 ? 2 : 0));
			}
			if(e.type === "DOMMouseScroll" || e.type === 'mousewheel') {
				e.mWheelDelta = 0;
				if (e.wheelDelta) {
					e.mWheelDelta = e.wheelDelta/120;
				} else if (e.detail) {
					e.mWheelDelta = -e.detail/3;
				}
			}
			return e;
		}
		function commonHandle(event, customScope) {
			event = fixEvent(event);
			var handlers = this.events[event.type];
			for (var g in handlers) {
				var handler = handlers[g];
				var ret = handler.call(customScope || this, event);
				if (ret === false) {
					event.preventDefault()
					event.stopPropagation()
				}
			}
		}
		var publicAPI = {
			add: function(elem, type, handler, forcedScope) {
				if (elem.setInterval && (elem != window && !elem.frameElement)) {
					elem = window;
				}
				if (!handler.guid) {
					handler.guid = ++guid;
				}
				if (!elem.events) {
					elem.events = {};
					elem.handle = function(event) {
						return commonHandle.call(elem, event);
					}
				}
				if (!elem.events[type]) {
					elem.events[type] = {};
					if (elem.addEventListener) elem.addEventListener(type, elem.handle, false);
					else if (elem.attachEvent) elem.attachEvent("on" + type, elem.handle);
					if(type === 'mousewheel') {
						publicAPI.add(elem, 'DOMMouseScroll', handler, forcedScope);
					}
				}
				var fakeHandler = jcf.lib.bind(handler, forcedScope);
				fakeHandler.guid = handler.guid;
				elem.events[type][handler.guid] = forcedScope ? fakeHandler : handler;
			},
			remove: function(elem, type, handler) {
				var handlers = elem.events && elem.events[type];
				if (!handlers) return;
				delete handlers[handler.guid];
				for(var any in handlers) return;
				if (elem.removeEventListener) elem.removeEventListener(type, elem.handle, false);
				else if (elem.detachEvent) elem.detachEvent("on" + type, elem.handle);
				delete elem.events[type];
				for (var any in elem.events) return;
				try {
					delete elem.handle;
					delete elem.events;
				} catch(e) {
					if(elem.removeAttribute) {
						elem.removeAttribute("handle");
						elem.removeAttribute("events");
					}
				}
				if(type === 'mousewheel') {
					publicAPI.remove(elem, 'DOMMouseScroll', handler);
				}
			}
		}
		return publicAPI;
	}())
}

// custom select module
jcf.addModule({
	name:'select',
	selector:'select',
	defaultOptions: {
		hideDropOnScroll: true,
		showNativeDrop: false,
		handleDropPosition: false,
		selectDropPosition: 'bottom', // or 'top'
		wrapperClass:'select-area',
		focusClass:'select-focus',
		dropActiveClass:'select-active',
		selectedClass:'item-selected',
		currentSelectedClass:'current-selected',
		disabledClass:'select-disabled',
		valueSelector:'span.center',
		optGroupClass:'optgroup',
		openerSelector:'a.select-opener',
		selectStructure:'<span class="left"></span><span class="center"></span><a class="select-opener"></a>',
		wrapperTag: 'span',
		classPrefix:'select-',
		dropMaxHeight: 200,
		dropFlippedClass: 'select-options-flipped',
		dropHiddenClass:'options-hidden',
		dropScrollableClass:'options-overflow',
		dropClass:'select-options',
		dropClassPrefix:'drop-',
		dropStructure:'<div class="drop-holder"><div class="drop-list"></div></div>',
		dropSelector:'div.drop-list'
	},
	checkElement: function(el){
		return (!el.size && !el.multiple);
	},
	setupWrapper: function(){
		jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
		this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
		this.fakeElement.innerHTML = this.options.selectStructure;
		this.fakeElement.style.width = (this.realElement.offsetWidth > 0 ? this.realElement.offsetWidth + 'px' : 'auto');

		// show native drop if specified in options
		if(jcf.isTouchDevice && jcf.baseOptions.useNativeDropOnMobileDevices) {
			this.options.showNativeDrop = true;
		}
		if(this.options.showNativeDrop) {
			this.fakeElement.appendChild(this.realElement);
			jcf.lib.removeClass(this.realElement, this.options.hiddenClass);
			jcf.lib.setStyles(this.realElement, {
				top:0,
				left:0,
				margin:0,
				padding:0,
				opacity:0,
				border:'none',
				position:'absolute',
				width: jcf.lib.getInnerWidth(this.fakeElement) - 1,
				height: jcf.lib.getInnerHeight(this.fakeElement) - 1
			});
			jcf.lib.event.add(this.realElement, 'touchstart', function(){
				this.realElement.title = '';
			}, this)
		}

		// create select body
		this.opener = jcf.lib.queryBySelector(this.options.openerSelector, this.fakeElement)[0];
		this.valueText = jcf.lib.queryBySelector(this.options.valueSelector, this.fakeElement)[0];
		jcf.lib.disableTextSelection(this.valueText);
		this.opener.jcf = this;

		if(!this.options.showNativeDrop) {
			this.createDropdown();
			this.refreshState();
			this.onControlReady(this);
			this.hideDropdown(true);
		} else {
			this.refreshState();
		}
		this.addEvents();
	},
	addEvents: function(){
		if(this.options.showNativeDrop) {
			jcf.lib.event.add(this.realElement, 'click', this.onChange, this);
		} else {
			jcf.lib.event.add(this.fakeElement, 'click', this.toggleDropdown, this);
		}
		jcf.lib.event.add(this.realElement, 'change', this.onChange, this);
	},
	onFakeClick: function() {
		// do nothing (drop toggles by toggleDropdown method)
	},
	onFocus: function(){
		jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
		if(!this.options.showNativeDrop) {
			// Mac Safari Fix
			if(jcf.lib.browser.safariMac) {
				this.realElement.setAttribute('size','2');
			}
			jcf.lib.event.add(this.realElement, 'keydown', this.onKeyDown, this);
			if(jcf.activeControl && jcf.activeControl != this) {
				jcf.activeControl.hideDropdown();
				jcf.activeControl = this;
			}
		}
	},
	onBlur: function(){
		if(!this.options.showNativeDrop) {
			// Mac Safari Fix
			if(jcf.lib.browser.safariMac) {
				this.realElement.removeAttribute('size');
			}
			if(!this.isActiveDrop() || !this.isOverDrop()) {
				jcf.modules[this.name].superclass.onBlur.apply(this);
				if(jcf.activeControl === this) jcf.activeControl = null;
				if(!jcf.isTouchDevice) {
					this.hideDropdown();
				}
			}
			jcf.lib.event.remove(this.realElement, 'keydown', this.onKeyDown);
		} else {
			jcf.modules[this.name].superclass.onBlur.apply(this);
		}
	},
	onChange: function() {
		this.refreshState();
	},
	onKeyDown: function(e){
		this.dropOpened = true;
		jcf.tmpFlag = true;
		setTimeout(function(){jcf.tmpFlag = false},100);
		var context = this;
		context.keyboardFix = true;
		setTimeout(function(){
			context.refreshState();
		},10);
		if(e.keyCode == 13) {
			context.toggleDropdown.apply(context);
			return false;
		}
	},
	onResizeWindow: function(e){
		if(this.isActiveDrop()) {
			this.hideDropdown();
		}
	},
	onScrollWindow: function(e){
		if(this.options.hideDropOnScroll) {
			this.hideDropdown();
		} else if(this.isActiveDrop()) {
			this.positionDropdown();
		}
	},
	onOptionClick: function(e){
		var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
		if(opener) {
			this.dropOpened = true;
			this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
			if(jcf.isTouchDevice) {
				this.onFocus();
			} else {
				this.realElement.focus();
			}
			this.refreshState();
			this.hideDropdown();
			jcf.lib.fireEvent(this.realElement, 'change');
		}
		return false;
	},
	onClickOutside: function(e){
		if(jcf.tmpFlag) {
			jcf.tmpFlag = false;
			return;
		}
		if(!jcf.lib.isParent(this.fakeElement, e.target) && !jcf.lib.isParent(this.selectDrop, e.target)) {
			this.hideDropdown();
		}
	},
	onDropHover: function(e){
		if(!this.keyboardFix) {
			this.hoverFlag = true;
			var opener = e.target && e.target.tagName && e.target.tagName.toLowerCase() == 'li' ? e.target : jcf.lib.getParent(e.target, 'li');
			if(opener) {
				this.realElement.selectedIndex = parseInt(opener.getAttribute('rel'));
				this.refreshSelectedClass(parseInt(opener.getAttribute('rel')));
			}
		} else {
			this.keyboardFix = false;
		}
	},
	onDropLeave: function(){
		this.hoverFlag = false;
	},
	isActiveDrop: function(){
		return !jcf.lib.hasClass(this.selectDrop, this.options.dropHiddenClass);
	},
	isOverDrop: function(){
		return this.hoverFlag;
	},
	createDropdown: function(){
		// remove old dropdown if exists
		if(this.selectDrop) {
			this.selectDrop.parentNode.removeChild(this.selectDrop);
		}

		// create dropdown holder
		this.selectDrop = document.createElement('div');
		this.selectDrop.className = this.options.dropClass;
		this.selectDrop.innerHTML = this.options.dropStructure;
		jcf.lib.setStyles(this.selectDrop, {position:'absolute'});
		this.selectList = jcf.lib.queryBySelector(this.options.dropSelector,this.selectDrop)[0];
		jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
		document.body.appendChild(this.selectDrop);
		this.selectDrop.jcf = this;
		jcf.lib.event.add(this.selectDrop, 'click', this.onOptionClick, this);
		jcf.lib.event.add(this.selectDrop, 'mouseover', this.onDropHover, this);
		jcf.lib.event.add(this.selectDrop, 'mouseout', this.onDropLeave, this);
		this.buildDropdown();
	},
	buildDropdown: function() {
		// build select options / optgroups
		this.buildDropdownOptions();

		// position and resize dropdown
		this.positionDropdown();

		// cut dropdown if height exceedes
		this.buildDropdownScroll();
	},
	buildDropdownOptions: function() {
		this.resStructure = '';
		this.optNum = 0;
		for(var i = 0; i < this.realElement.children.length; i++) {
			this.resStructure += this.buildElement(this.realElement.children[i], i) +'\n';
		}
		this.selectList.innerHTML = this.resStructure;
	},
	buildDropdownScroll: function() {
		if(this.options.dropMaxHeight) {
			if(this.selectDrop.offsetHeight > this.options.dropMaxHeight) {
				this.selectList.style.height = this.options.dropMaxHeight+'px';
				this.selectList.style.overflow = 'auto';
				this.selectList.style.overflowX = 'hidden';
				jcf.lib.addClass(this.selectDrop, this.options.dropScrollableClass);
			}
		}
		jcf.lib.addClass(this.selectDrop, jcf.lib.getAllClasses(this.realElement.className, this.options.dropClassPrefix, jcf.baseOptions.hiddenClass));
	},
	parseOptionTitle: function(optTitle) {
		return (typeof optTitle === 'string' && /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i.test(optTitle)) ? optTitle : '';
	},
	buildElement: function(obj, index){
		// build option
		var res = '', optImage;
		if(obj.tagName.toLowerCase() == 'option') {
			if(!jcf.lib.prevSibling(obj) || jcf.lib.prevSibling(obj).tagName.toLowerCase() != 'option') {
				res += '<ul>';
			}

			optImage = this.parseOptionTitle(obj.title);
			res += '<li rel="'+(this.optNum++)+'" class="'+(obj.className? obj.className + ' ' : '')+(index % 2 ? 'option-even ' : '')+'jcfcalc"><a href="#">'+(optImage ? '<img src="'+optImage+'" alt="" />' : '')+'<span>' + obj.innerHTML + '</span></a></li>';
			if(!jcf.lib.nextSibling(obj) || jcf.lib.nextSibling(obj).tagName.toLowerCase() != 'option') {
				res += '</ul>';
			}
			return res;
		}
		// build option group with options
		else if(obj.tagName.toLowerCase() == 'optgroup' && obj.label) {
			res += '<div class="'+this.options.optGroupClass+'">';
			res += '<strong class="jcfcalc"><em>'+(obj.label)+'</em></strong>';
			for(var i = 0; i < obj.children.length; i++) {
				res += this.buildElement(obj.children[i], i);
			}
			res += '</div>';
			return res;
		}
	},
	positionDropdown: function(){
		var ofs = jcf.lib.getOffset(this.fakeElement), selectAreaHeight = this.fakeElement.offsetHeight, selectDropHeight = this.selectDrop.offsetHeight;
		var fitInTop = ofs.top - selectDropHeight >= jcf.lib.getScrollTop() && jcf.lib.getScrollTop() + jcf.lib.getWindowHeight() < ofs.top + selectAreaHeight + selectDropHeight;


		if((this.options.handleDropPosition && fitInTop) || this.options.selectDropPosition === 'top') {
			this.selectDrop.style.top = (ofs.top - selectDropHeight)+'px';
			jcf.lib.addClass(this.selectDrop, this.options.dropFlippedClass);
		} else {
			this.selectDrop.style.top = (ofs.top + selectAreaHeight)+'px';
			jcf.lib.removeClass(this.selectDrop, this.options.dropFlippedClass);
		}
		this.selectDrop.style.left = ofs.left+'px';
		this.selectDrop.style.width = this.fakeElement.offsetWidth+'px';
	},
	showDropdown: function(){
		document.body.appendChild(this.selectDrop);
		jcf.lib.removeClass(this.selectDrop, this.options.dropHiddenClass);
		jcf.lib.addClass(this.fakeElement,this.options.dropActiveClass);
		this.positionDropdown();

		// highlight current active item
		var activeItem = this.getFakeActiveOption();
		this.removeClassFromItems(this.options.currentSelectedClass);
		jcf.lib.addClass(activeItem, this.options.currentSelectedClass);

		// show current dropdown
		jcf.lib.event.add(window, 'resize', this.onResizeWindow, this);
		jcf.lib.event.add(window, 'scroll', this.onScrollWindow, this);
		jcf.lib.event.add(document, jcf.eventPress, this.onClickOutside, this);
		this.positionDropdown();
	},
	hideDropdown: function(partial){
		if(this.selectDrop.parentNode) {
			if(this.selectDrop.offsetWidth) {
				this.selectDrop.parentNode.removeChild(this.selectDrop);
			}
			if(partial) {
				return;
			}
		}
		if(typeof this.origSelectedIndex === 'number') {
			this.realElement.selectedIndex = this.origSelectedIndex;
		}
		jcf.lib.removeClass(this.fakeElement,this.options.dropActiveClass);
		jcf.lib.addClass(this.selectDrop, this.options.dropHiddenClass);
		jcf.lib.event.remove(window, 'resize', this.onResizeWindow);
		jcf.lib.event.remove(window, 'scroll', this.onScrollWindow);
		jcf.lib.event.remove(document.documentElement, jcf.eventPress, this.onClickOutside);
		if(jcf.isTouchDevice) {
			this.onBlur();
		}
	},
	toggleDropdown: function(){
		if(!this.realElement.disabled) {
			if(jcf.isTouchDevice) {
				this.onFocus();
			} else {
				this.realElement.focus();
			}
			if(this.isActiveDrop()) {
				this.hideDropdown();
			} else {
				this.showDropdown();
			}
			this.refreshState();
		}
	},
	scrollToItem: function(){
		if(this.isActiveDrop()) {
			var dropHeight = this.selectList.offsetHeight;
			var offsetTop = this.calcOptionOffset(this.getFakeActiveOption());
			var sTop = this.selectList.scrollTop;
			var oHeight = this.getFakeActiveOption().offsetHeight;
			//offsetTop+=sTop;

			if(offsetTop >= sTop + dropHeight) {
				this.selectList.scrollTop = offsetTop - dropHeight + oHeight;
			} else if(offsetTop < sTop) {
				this.selectList.scrollTop = offsetTop;
			}
		}
	},
	getFakeActiveOption: function(c) {
		return jcf.lib.queryBySelector('li[rel="'+(typeof c === 'number' ? c : this.realElement.selectedIndex) +'"]',this.selectList)[0];
	},
	calcOptionOffset: function(fake) {
		var h = 0;
		var els = jcf.lib.queryBySelector('.jcfcalc',this.selectList);
		for(var i = 0; i < els.length; i++) {
			if(els[i] == fake) break;
			h+=els[i].offsetHeight;
		}
		return h;
	},
	childrenHasItem: function(hold,item) {
		var items = hold.getElementsByTagName('*');
		for(i = 0; i < items.length; i++) {
			if(items[i] == item) return true;
		}
		return false;
	},
	removeClassFromItems: function(className){
		var children = jcf.lib.queryBySelector('li',this.selectList);
		for(var i = children.length - 1; i >= 0; i--) {
			jcf.lib.removeClass(children[i], className);
		}
	},
	setSelectedClass: function(c){
		jcf.lib.addClass(this.getFakeActiveOption(c), this.options.selectedClass);
	},
	refreshSelectedClass: function(c){
		if(!this.options.showNativeDrop) {
			this.removeClassFromItems(this.options.selectedClass);
			this.setSelectedClass(c);
		}
		if(this.realElement.disabled) {
			jcf.lib.addClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.addClass(this.labelFor, this.options.labelDisabledClass);
			}
		} else {
			jcf.lib.removeClass(this.fakeElement, this.options.disabledClass);
			if(this.labelFor) {
				jcf.lib.removeClass(this.labelFor, this.options.labelDisabledClass);
			}
		}
	},
	refreshSelectedText: function() {
		if(!this.dropOpened && this.realElement.title) {
			this.valueText.innerHTML = this.realElement.title;
		} else {
			if(this.realElement.options[this.realElement.selectedIndex].title) {
				var optImage = this.parseOptionTitle(this.realElement.options[this.realElement.selectedIndex].title);
				this.valueText.innerHTML = (optImage ? '<img src="'+optImage+'" alt="" />' : '') + this.realElement.options[this.realElement.selectedIndex].innerHTML;
			} else {
				this.valueText.innerHTML = this.realElement.options[this.realElement.selectedIndex].innerHTML;
			}
		}
	},
	refreshState: function(){
		this.origSelectedIndex = this.realElement.selectedIndex;
		this.refreshSelectedClass();
		this.refreshSelectedText();
		if(!this.options.showNativeDrop) {
			this.positionDropdown();
			if(this.selectDrop.offsetWidth) {
				this.scrollToItem();
			}
		}
	}
});

// custom radio module
jcf.addModule({
	name:'radio',
	selector: 'input[type="radio"]',
	defaultOptions: {
		wrapperClass:'rad-area',
		focusClass:'rad-focus',
		checkedClass:'rad-checked',
		uncheckedClass:'rad-unchecked',
		disabledClass:'rad-disabled',
		radStructure:'<span></span>'
	},
	getRadioGroup: function(item){
		var name = item.getAttribute('name');
		if(name) {
			return jcf.lib.queryBySelector('input[name="'+name+'"]', jcf.lib.getParent('form'));
		} else {
			return [item];
		}
	},
	setupWrapper: function(){
		jcf.lib.addClass(this.fakeElement, this.options.wrapperClass);
		this.fakeElement.innerHTML = this.options.radStructure;
		this.realElement.parentNode.insertBefore(this.fakeElement, this.realElement);
		this.refreshState();
		this.addEvents();
	},
	addEvents: function(){
		jcf.lib.event.add(this.fakeElement, 'click', this.toggleRadio, this);
		if(this.labelFor) {
			jcf.lib.event.add(this.labelFor, 'click', this.toggleRadio, this);
		}
	},
	onFocus: function(e) {
		jcf.modules[this.name].superclass.onFocus.apply(this, arguments);
		setTimeout(jcf.lib.bind(function(){
			this.refreshState();
		},this),10);
	},
	toggleRadio: function(){
		if(!this.realElement.disabled) {
			this.realElement.checked = true;
		}
		this.refreshState();
	},
	refreshState: function(){
		var els = this.getRadioGroup(this.realElement);
		for(var i = 0; i < els.length; i++) {
			var curEl = els[i].jcf;
			if(curEl) {
				if(curEl.realElement.checked) {
					jcf.lib.addClass(curEl.fakeElement, curEl.options.checkedClass);
					jcf.lib.removeClass(curEl.fakeElement, curEl.options.uncheckedClass);
					if(curEl.labelFor) {
						jcf.lib.addClass(curEl.labelFor, curEl.options.labelActiveClass);
					}
				} else {
					jcf.lib.removeClass(curEl.fakeElement, curEl.options.checkedClass);
					jcf.lib.addClass(curEl.fakeElement, curEl.options.uncheckedClass);
					if(curEl.labelFor) {
						jcf.lib.removeClass(curEl.labelFor, curEl.options.labelActiveClass);
					}
				}
				if(curEl.realElement.disabled) {
					jcf.lib.addClass(curEl.fakeElement, curEl.options.disabledClass);
					if(curEl.labelFor) {
						jcf.lib.addClass(curEl.labelFor, curEl.options.labelDisabledClass);
					}
				} else {
					jcf.lib.removeClass(curEl.fakeElement, curEl.options.disabledClass);
					if(curEl.labelFor) {
						jcf.lib.removeClass(curEl.labelFor, curEl.options.labelDisabledClass);
					}
				}
			}
		}
	}
});
function hideFormText() {
	var _inputs = document.getElementsByTagName('input');
	var _txt = document.getElementsByTagName('textarea');
	var _value = [];

	if (_inputs) {
		for(var i=0; i<_inputs.length; i++) {
			if (_inputs[i].type == 'text' || _inputs[i].type == 'password') {

				_inputs[i].index = i;
				_value[i] = _inputs[i].value;

				_inputs[i].onfocus = function(){
					if (this.value == _value[this.index])
						this.value = '';
				}
				_inputs[i].onblur = function(){
					if (this.value == '')
						this.value = _value[this.index];
				}
			}
		}
	}
	if (_txt) {
		for(var i=0; i<_txt.length; i++) {
			_txt[i].index = i;
			_value['txt'+i] = _txt[i].value;

			_txt[i].onfocus = function(){
				if (this.value == _value['txt'+this.index])
					this.value = '';
			}
			_txt[i].onblur = function(){
				if (this.value == '')
					this.value = _value['txt'+this.index];
			}
		}
	}
}
if (window.addEventListener)
	window.addEventListener("load", hideFormText, false);
else if (window.attachEvent)
	window.attachEvent("onload", hideFormText);

	/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);


/*
 * jQuery SlideShow plugin
 */
;(function($){
	function FadeGallery(options) {
		this.options = $.extend({
			slides: 'ul.slideset > li',
			activeClass:'active',
			disabledClass:'disabled',
			btnPrev: 'a.btn-prev',
			btnNext: 'a.btn-next',
			generatePagination: false,
			pagerList: '<ul>',
			pagerListItem: '<li><a href="#"></a></li>',
			pagerListItemText: 'a',
			pagerLinks: '.pagination li',
			currentNumber: 'span.current-num',
			totalNumber: 'span.total-num',
			btnPlay: '.btn-play',
			btnPause: '.btn-pause',
			btnPlayPause: '.btn-play-pause',
			galleryReadyClass: 'gallery-js-ready',
			autorotationActiveClass: 'autorotation-active',
			autorotationDisabledClass: 'autorotation-disabled',
			autorotationStopAfterClick: false,
			circularRotation: true,
			switchSimultaneously: true,
			disableWhileAnimating: false,
			disableFadeIE: false,
			autoRotation: false,
			pauseOnHover: true,
			autoHeight: false,
			useSwipe: false,
			switchTime: 4000,
			animSpeed: 600,
			event:'click'
		}, options);
		this.init();
	}
	FadeGallery.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.initStructure();
				this.attachEvents();
				this.refreshState(true);
				this.autoRotate();
				this.makeCallback('onInit', this);
			}
		},
		findElements: function() {
			// control elements
			this.gallery = $(this.options.holder).addClass(this.options.galleryReadyClass);
			this.slides = this.gallery.find(this.options.slides);
			this.slidesHolder = this.slides.eq(0).parent();
			this.stepsCount = this.slides.length;
			this.btnPrev = this.gallery.find(this.options.btnPrev);
			this.btnNext = this.gallery.find(this.options.btnNext);
			this.currentIndex = 0;

			// disable fade effect in old IE
			if(this.options.disableFadeIE && $.browser.msie && $.browser.version < 9) {
				this.options.animSpeed = 0;
			}

			// create gallery pagination
			if(typeof this.options.generatePagination === 'string') {
				this.pagerHolder = this.gallery.find(this.options.generatePagination).empty();
				this.pagerList = $(this.options.pagerList).appendTo(this.pagerHolder);
				for(var i = 0; i < this.stepsCount; i++) {
					$(this.options.pagerListItem).appendTo(this.pagerList).find(this.options.pagerListItemText).text(i+1);
				}
				this.pagerLinks = this.pagerList.children();
			} else {
				this.pagerLinks = this.gallery.find(this.options.pagerLinks);
			}

			// get start index
			var activeSlide = this.slides.filter('.'+this.options.activeClass);
			if(activeSlide.length) {
				this.currentIndex = this.slides.index(activeSlide);
			}
			this.prevIndex = this.currentIndex;

			// autorotation control buttons
			this.btnPlay = this.gallery.find(this.options.btnPlay);
			this.btnPause = this.gallery.find(this.options.btnPause);
			this.btnPlayPause = this.gallery.find(this.options.btnPlayPause);

			// misc elements
			this.curNum = this.gallery.find(this.options.currentNumber);
			this.allNum = this.gallery.find(this.options.totalNumber);

			// handle flexible layout
			$(window).bind('load resize orientationchange', $.proxy(this.onWindowResize, this));
		},
		initStructure: function() {
			this.slides.css({display:'block',opacity:0}).eq(this.currentIndex).css({
				opacity:''
			});
		},
		attachEvents: function() {
			var self = this;
			this.btnPrev.bind(this.options.event, function(e){
				self.prevSlide();
				if(self.options.autorotationStopAfterClick) {
					self.stopRotation();
				}
				e.preventDefault();
			});
			this.btnNext.bind(this.options.event, function(e){
				self.nextSlide();
				if(self.options.autorotationStopAfterClick) {
					self.stopRotation();
				}
				e.preventDefault();
			});
			this.pagerLinks.each(function(ind, obj){
				$(obj).bind(self.options.event, function(e){
					self.numSlide(ind);
					if(self.options.autorotationStopAfterClick) {
						self.stopRotation();
					}
					e.preventDefault();
				});
			});

			// autorotation buttons handler
			this.btnPlay.bind(this.options.event, function(e){
				self.startRotation();
				e.preventDefault();
			});
			this.btnPause.bind(this.options.event, function(e){
				self.stopRotation();
				e.preventDefault();
			});
			this.btnPlayPause.bind(this.options.event, function(e){
				if(!self.gallery.hasClass(self.options.autorotationActiveClass)) {
					self.startRotation();
				} else {
					self.stopRotation();
				}
				e.preventDefault();
			});

			// swipe gestures handler
			if(this.options.useSwipe && $.fn.swipe) {
				this.gallery.swipe({
					excludedElements: '',
					fallbackToMouseEvents: false,
					swipeLeft: function() {
						self.nextSlide();
					},
					swipeRight: function() {
						self.prevSlide();
					}
				});
			}

			// pause on hover handling
			if(this.options.pauseOnHover) {
				this.gallery.hover(function(){
					if(self.options.autoRotation) {
						self.galleryHover = true;
						self.pauseRotation();
					}
				}, function(){
					if(self.options.autoRotation) {
						self.galleryHover = false;
						self.resumeRotation();
					}
				});
			}
		},
		onWindowResize: function(){
			if(this.options.autoHeight) {
				this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
			}
		},
		prevSlide: function() {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				this.prevIndex = this.currentIndex;
				if(this.currentIndex > 0) {
					this.currentIndex--;
					this.switchSlide();
				} else if(this.options.circularRotation) {
					this.currentIndex = this.stepsCount - 1;
					this.switchSlide();
				}
			}
		},
		nextSlide: function(fromAutoRotation) {
			if(!(this.options.disableWhileAnimating && this.galleryAnimating)) {
				this.prevIndex = this.currentIndex;
				if(this.currentIndex < this.stepsCount - 1) {
					this.currentIndex++;
					this.switchSlide();
				} else if(this.options.circularRotation || fromAutoRotation === true) {
					this.currentIndex = 0;
					this.switchSlide();
				}
			}
		},
		numSlide: function(c) {
			if(this.currentIndex != c) {
				this.prevIndex = this.currentIndex;
				this.currentIndex = c;
				this.switchSlide();
			}
		},
		switchSlide: function() {
			var self = this;
			if(this.slides.length > 1) {
				this.galleryAnimating = true;
				if(!this.options.animSpeed) {
					this.slides.eq(this.prevIndex).css({opacity:0});
				} else {
					this.slides.eq(this.prevIndex).stop().animate({opacity:0},{duration: this.options.animSpeed});
				}

				this.switchNext = function() {
					if(!self.options.animSpeed) {
						self.slides.eq(self.currentIndex).css({opacity:''});
					} else {
						self.slides.eq(self.currentIndex).stop().animate({opacity:1},{duration: self.options.animSpeed});
					}
					setTimeout(function() {
						self.slides.eq(self.currentIndex).css({opacity:''});
						self.galleryAnimating = false;
						self.autoRotate();

						// onchange callback
						self.makeCallback('onChange', self);
					}, self.options.animSpeed);
				}

				if(this.options.switchSimultaneously) {
					self.switchNext();
				} else {
					clearTimeout(this.switchTimer);
					this.switchTimer = setTimeout(function(){
						self.switchNext();
					}, this.options.animSpeed);
				}
				this.refreshState();

				// onchange callback
				this.makeCallback('onBeforeChange', this);
			}
		},
		refreshState: function(initial) {
			this.slides.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.pagerLinks.removeClass(this.options.activeClass).eq(this.currentIndex).addClass(this.options.activeClass);
			this.curNum.html(this.currentIndex+1);
			this.allNum.html(this.stepsCount);

			// initial refresh
			if(this.options.autoHeight) {
				if(initial) {
					this.slidesHolder.css({height: this.slides.eq(this.currentIndex).outerHeight(true) });
				} else {
					this.slidesHolder.stop().animate({height: this.slides.eq(this.currentIndex).outerHeight(true)}, {duration: this.options.animSpeed});
				}
			}

			// disabled state
			if(!this.options.circularRotation) {
				this.btnPrev.add(this.btnNext).removeClass(this.options.disabledClass);
				if(this.currentIndex === 0) this.btnPrev.addClass(this.options.disabledClass);
				if(this.currentIndex === this.stepsCount - 1) this.btnNext.addClass(this.options.disabledClass);
			}
		},
		startRotation: function() {
			this.options.autoRotation = true;
			this.galleryHover = false;
			this.autoRotationStopped = false;
			this.resumeRotation();
		},
		stopRotation: function() {
			this.galleryHover = true;
			this.autoRotationStopped = true;
			this.pauseRotation();
		},
		pauseRotation: function() {
			this.gallery.addClass(this.options.autorotationDisabledClass);
			this.gallery.removeClass(this.options.autorotationActiveClass);
			clearTimeout(this.timer);
		},
		resumeRotation: function() {
			if(!this.autoRotationStopped) {
				this.gallery.addClass(this.options.autorotationActiveClass);
				this.gallery.removeClass(this.options.autorotationDisabledClass);
				this.autoRotate();
			}
		},
		autoRotate: function() {
			var self = this;
			clearTimeout(this.timer);
			if(this.options.autoRotation && !this.galleryHover && !this.autoRotationStopped) {
				this.gallery.addClass(this.options.autorotationActiveClass);
				this.timer = setTimeout(function(){
					self.nextSlide(true);
				}, this.options.switchTime);
			} else {
				this.pauseRotation();
			}
		},
		makeCallback: function(name) {
			if(typeof this.options[name] === 'function') {
				var args = Array.prototype.slice.call(arguments);
				args.shift();
				this.options[name].apply(this, args);
			}
		}
	}

	// jquery plugin
	$.fn.fadeGallery = function(opt){
		return this.each(function(){
			$(this).data('FadeGallery', new FadeGallery($.extend(opt,{holder:this})));
		});
	}
}(jQuery));

/*
* touchSwipe - jQuery Plugin
* https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* http://labs.skinkers.com/touchSwipe/
* http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson (www.skinkers.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* $version: 1.6.0
*/;(function(d){+"use strict";var n="left",m="right",c="up",u="down",b="in",v="out",k="none",q="auto",j="swipe",r="pinch",e="click",x="horizontal",s="vertical",h="all",f="start",i="move",g="end",o="cancel",a="ontouchstart" in window,w="TouchSwipe";var l={fingers:1,threshold:75,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"button, input, select, textarea, a, .noSwipe"};d.fn.swipe=function(A){var z=d(this),y=z.data(w);if(y&&typeof A==="string"){if(y[A]){return y[A].apply(this,Array.prototype.slice.call(arguments,1))}else{d.error("Method "+A+" does not exist on jQuery.swipe")}}else{if(!y&&(typeof A==="object"||!A)){return t.apply(this,arguments)}}return z};d.fn.swipe.defaults=l;d.fn.swipe.phases={PHASE_START:f,PHASE_MOVE:i,PHASE_END:g,PHASE_CANCEL:o};d.fn.swipe.directions={LEFT:n,RIGHT:m,UP:c,DOWN:u,IN:b,OUT:v};d.fn.swipe.pageScroll={NONE:k,HORIZONTAL:x,VERTICAL:s,AUTO:q};d.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:h};function t(y){if(y&&(y.allowPageScroll===undefined&&(y.swipe!==undefined||y.swipeStatus!==undefined))){y.allowPageScroll=k}if(!y){y={}}y=d.extend({},d.fn.swipe.defaults,y);return this.each(function(){var A=d(this);var z=A.data(w);if(!z){z=new p(this,y);A.data(w,z)}})}function p(S,af){var aF=(a||!af.fallbackToMouseEvents),ax=aF?"touchstart":"mousedown",U=aF?"touchmove":"mousemove",au=aF?"touchend":"mouseup",D=aF?null:"mouseleave",R="touchcancel";var ac=0;var N=null;var ag=0;var aB=0;var A=0;var ai=1;var aH=0;var H=d(S);var O="start";var aE=0;var ah=null;var I=0;var Y=0;var aA=0;var aJ=0;try{H.bind(ax,ar);H.bind(R,M)}catch(aC){d.error("events not supported "+ax+","+R+" on jQuery.swipe")}this.enable=function(){H.bind(ax,ar);H.bind(R,M);return H};this.disable=function(){Q();return H};this.destroy=function(){Q();H.data(w,null);return H};function ar(aM){if(X()){return}if(d(aM.target).closest(af.excludedElements,H).length>0){return}var aN=aM.originalEvent;var aL,aK=a?aN.touches[0]:aN;O=f;if(a){aE=aN.touches.length}else{aM.preventDefault()}ac=0;N=null;aH=null;ag=0;aB=0;A=0;ai=1;pinchDistance=0;ah=T();z();if(!a||(aE===af.fingers||af.fingers===h)||ao()){aI(0,aK);I=B();if(aE==2){aI(1,aN.touches[1]);aB=A=Z(ah[0].start,ah[1].start)}if(af.swipeStatus||af.pinchStatus){aL=aD(aN,O)}}else{aL=false}if(aL===false){O=o;aD(aN,O);return aL}else{aj(true)}}function P(aN){var aQ=aN.originalEvent;if(O===g||O===o||ae()){return}var aM,aL=a?aQ.touches[0]:aQ;var aO=V(aL);Y=B();if(a){aE=aQ.touches.length}O=i;if(aE==2){if(aB==0){aI(1,aQ.touches[1]);aB=A=Z(ah[0].start,ah[1].start)}else{V(aQ.touches[1]);A=Z(ah[0].end,ah[1].end);aH=an(ah[0].end,ah[1].end)}ai=y(aB,A);pinchDistance=Math.abs(aB-A)}if((aE===af.fingers||af.fingers===h)||!a||ao()){N=aq(aO.start,aO.end);C(aN,N);ac=G(aO.start,aO.end);ag=L();if(af.swipeStatus||af.pinchStatus){aM=aD(aQ,O)}if(!af.triggerOnTouchEnd||af.triggerOnTouchLeave){var aK=true;if(af.triggerOnTouchLeave){var aP=at(this);aK=az(aO.end,aP)}if(!af.triggerOnTouchEnd&&aK){O=aG(i)}else{if(af.triggerOnTouchLeave&&!aK){O=aG(g)}}if(O==o||O==g){aD(aQ,O)}}}else{O=o;aD(aQ,O)}if(aM===false){O=o;aD(aQ,O)}}function aa(aM){var aO=aM.originalEvent;if(a){if(aO.touches.length>0){av();return true}}if(ae()){aE=aJ}aM.preventDefault();Y=B();if(af.triggerOnTouchEnd||(af.triggerOnTouchEnd==false&&O===i)){O=g;var aL=((aE===af.fingers||af.fingers===h)||!a);var aK=ah[0].end.x!==0;var aN=aL&&aK&&(am()||ay());if(aN){aD(aO,O)}else{O=o;aD(aO,O)}}else{if(O===i){O=o;aD(aO,O)}}aj(false)}function M(){aE=0;Y=0;I=0;aB=0;A=0;ai=1;z();aj(false)}function W(aK){var aL=aK.originalEvent;if(af.triggerOnTouchLeave){O=aG(g);aD(aL,O)}}function Q(){H.unbind(ax,ar);H.unbind(R,M);H.unbind(U,P);H.unbind(au,aa);if(D){H.unbind(D,W)}aj(false)}function aG(aN){var aM=aN;var aL=ap();var aK=ad();if(!aL){aM=o}else{if(aK&&aN==i&&(!af.triggerOnTouchEnd||af.triggerOnTouchLeave)){aM=g}else{if(!aK&&aN==g&&af.triggerOnTouchLeave){aM=o}}}return aM}function aD(aM,aK){var aL=undefined;if(ab()){aL=al(aM,aK,j)}if(ao()&&aL!==false){aL=al(aM,aK,r)}if(K()&&aL!==false){aL=al(aM,aK,e)}if(aK===o){M(aM)}if(aK===g){if(a){if(aM.touches.length==0){M(aM)}}else{M(aM)}}return aL}function al(aN,aK,aM){var aL=undefined;if(aM==j){if(af.swipeStatus){aL=af.swipeStatus.call(H,aN,aK,N||null,ac||0,ag||0,aE);if(aL===false){return false}}if(aK==g&&ay()){if(af.swipe){aL=af.swipe.call(H,aN,N,ac,ag,aE);if(aL===false){return false}}switch(N){case n:if(af.swipeLeft){aL=af.swipeLeft.call(H,aN,N,ac,ag,aE)}break;case m:if(af.swipeRight){aL=af.swipeRight.call(H,aN,N,ac,ag,aE)}break;case c:if(af.swipeUp){aL=af.swipeUp.call(H,aN,N,ac,ag,aE)}break;case u:if(af.swipeDown){aL=af.swipeDown.call(H,aN,N,ac,ag,aE)}break}}}if(aM==r){if(af.pinchStatus){aL=af.pinchStatus.call(H,aN,aK,aH||null,pinchDistance||0,ag||0,aE,ai);if(aL===false){return false}}if(aK==g&&am()){switch(aH){case b:if(af.pinchIn){aL=af.pinchIn.call(H,aN,aH||null,pinchDistance||0,ag||0,aE,ai)}break;case v:if(af.pinchOut){aL=af.pinchOut.call(H,aN,aH||null,pinchDistance||0,ag||0,aE,ai)}break}}}if(aM==e){if(aK===o){if(af.click&&(aE===1||!a)&&(isNaN(ac)||ac===0)){aL=af.click.call(H,aN,aN.target)}}}return aL}function ad(){if(af.threshold!==null){return ac>=af.threshold}return true}function ak(){if(af.pinchThreshold!==null){return pinchDistance>=af.pinchThreshold}return true}function ap(){var aK;if(af.maxTimeThreshold){if(ag>=af.maxTimeThreshold){aK=false}else{aK=true}}else{aK=true}return aK}function C(aK,aL){if(af.allowPageScroll===k||ao()){aK.preventDefault()}else{var aM=af.allowPageScroll===q;switch(aL){case n:if((af.swipeLeft&&aM)||(!aM&&af.allowPageScroll!=x)){aK.preventDefault()}break;case m:if((af.swipeRight&&aM)||(!aM&&af.allowPageScroll!=x)){aK.preventDefault()}break;case c:if((af.swipeUp&&aM)||(!aM&&af.allowPageScroll!=s)){aK.preventDefault()}break;case u:if((af.swipeDown&&aM)||(!aM&&af.allowPageScroll!=s)){aK.preventDefault()}break}}}function am(){return ak()}function ao(){return !!(af.pinchStatus||af.pinchIn||af.pinchOut)}function aw(){return !!(am()&&ao())}function ay(){var aK=ap();var aM=ad();var aL=aM&&aK;return aL}function ab(){return !!(af.swipe||af.swipeStatus||af.swipeLeft||af.swipeRight||af.swipeUp||af.swipeDown)}function E(){return !!(ay()&&ab())}function K(){return !!(af.click)}function av(){aA=B();aJ=event.touches.length+1}function z(){aA=0;aJ=0}function ae(){var aK=false;if(aA){var aL=B()-aA;if(aL<=af.fingerReleaseThreshold){aK=true}}return aK}function X(){return !!(H.data(w+"_intouch")===true)}function aj(aK){if(aK===true){H.bind(U,P);H.bind(au,aa);if(D){H.bind(D,W)}}else{H.unbind(U,P,false);H.unbind(au,aa,false);if(D){H.unbind(D,W,false)}}H.data(w+"_intouch",aK===true)}function aI(aL,aK){var aM=aK.identifier!==undefined?aK.identifier:0;ah[aL].identifier=aM;ah[aL].start.x=ah[aL].end.x=aK.pageX;ah[aL].start.y=ah[aL].end.y=aK.pageY;return ah[aL]}function V(aK){var aM=aK.identifier!==undefined?aK.identifier:0;var aL=J(aM);aL.end.x=aK.pageX;aL.end.y=aK.pageY;return aL}function J(aL){for(var aK=0;aK<ah.length;aK++){if(ah[aK].identifier==aL){return ah[aK]}}}function T(){var aK=[];for(var aL=0;aL<=5;aL++){aK.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return aK}function L(){return Y-I}function Z(aN,aM){var aL=Math.abs(aN.x-aM.x);var aK=Math.abs(aN.y-aM.y);return Math.round(Math.sqrt(aL*aL+aK*aK))}function y(aK,aL){var aM=(aL/aK)*1;return aM.toFixed(2)}function an(){if(ai<1){return v}else{return b}}function G(aL,aK){return Math.round(Math.sqrt(Math.pow(aK.x-aL.x,2)+Math.pow(aK.y-aL.y,2)))}function F(aN,aL){var aK=aN.x-aL.x;var aP=aL.y-aN.y;var aM=Math.atan2(aP,aK);var aO=Math.round(aM*180/Math.PI);if(aO<0){aO=360-Math.abs(aO)}return aO}function aq(aL,aK){var aM=F(aL,aK);if((aM<=45)&&(aM>=0)){return n}else{if((aM<=360)&&(aM>=315)){return n}else{if((aM>=135)&&(aM<=225)){return m}else{if((aM>45)&&(aM<135)){return u}else{return c}}}}}function B(){var aK=new Date();return aK.getTime()}function at(aK){aK=d(aK);var aM=aK.offset();var aL={left:aM.left,right:aM.left+aK.outerWidth(),top:aM.top,bottom:aM.top+aK.outerHeight()};return aL}function az(aK,aL){return(aK.x>aL.left&&aK.x<aL.right&&aK.y>aL.top&&aK.y<aL.bottom)}}})(jQuery);

/*
* jquery-match-height 0.7.0 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,i=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),n=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-i(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(n-a))<=o?r[r.length-1]=s.add(e):r.push(e),n=a}),r},n=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=n(e);if(o.remove){var i=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(i)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.0",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=a,r._parse=i,r._parseOptions=n,r._apply=function(e,o){var s=n(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),i=e.css("display");"inline-block"!==i&&"flex"!==i&&"inline-flex"!==i&&(i="block");var a={
display:i};a[s.property]="",e.css(a),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=i(e.css("border-top-width"))+i(e.css("border-bottom-width")),o+=i(e.css("padding-top"))+i(e.css("padding-bottom"))),e.css(s.property,n-o+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),i=o.attr("data-mh")||o.attr("data-match-height");i in e?e[i]=e[i].add(o):e[i]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(i,a){if(a&&"resize"===a.type){var n=t(window).width();if(n===e)return;e=n;
}i?-1===o&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})});