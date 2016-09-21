//Some help on the reveal transitions from http://tympanus.net/codrops/2016/06/01/multi-layer-page-reveal-effects/

var Modernizr = require('js/modernizr');
'use strict';
var winsize = { width : window.innerWidth, height : window.innerHeight };
var support = { animations : Modernizr.cssanimations };
// animationend event function
var animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' };
var animEndEventName = animEndEventNames[ Modernizr.prefixed('animation')];

var onEndAnimation = function( el, callback ) {
	var onEndCallbackFn = function( ev ) {
		if( support.animations ) {
			if( ev.target != this ) return;
			this.removeEventListener( animEndEventName, onEndCallbackFn );
		}
		if( callback && typeof callback === 'function' ) { callback.call(); }
	};
	if( support.animations ) {
		el.addEventListener( animEndEventName, onEndCallbackFn );
	} else {
		onEndCallbackFn();
	}
};

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
function extend( a, b ) {
	for( var key in b ) {
		if( b.hasOwnProperty( key ) ) {
			a[key] = b[key];
		}
	}
	return a;
}

function Revealer(options) {
	this.options = extend( {}, this.options );
	extend( this.options, options );
	this._init();
}

Revealer.prototype.options = {
	// total number of revealing layers (min is 1)
	nmbLayers : 3,
	// bg color for the revealing layers
	bgcolor : ['#5e6472', '#ccc', '#fff'],
	// effect classname
	effect : 'anim--effect-3',
	// callback
	onStart : function(direction) { return false; },
	// callback
	onEnd : function(direction) { return false; }
};

Revealer.prototype._init = function() {
	// add revealer layers
	this._addLayers();
	// now we have access to the layers
	this.layers = [].slice.call(this.revealerWrapper.children);
	// init/bind events
	this._initEvents();
};

Revealer.prototype._initEvents = function() {
	// window resize: recalculate window sizes
	this.debounceResize = debounce(function(ev) {
		winsize = {width: window.innerWidth, height: window.innerHeight};
	}, 10);
	window.addEventListener('resize', this.debounceResize);
};

Revealer.prototype._addLayers = function() {
	this.revealerWrapper = document.createElement('div');
	this.revealerWrapper.className = 'revealer';
	document.body.classList.add(this.options.effect);
	var  strHTML = '';
	for(var i = 0; i < this.options.nmbLayers; ++i) {
		var bgcolor;
		if(typeof this.options.bgcolor === 'string') {
			bgcolor = this.options.bgcolor;
		} else {
			if (this.options.bgcolor instanceof Array && this.options.bgcolor[i]) {
				bgcolor = this.options.bgcolor[i];
			} else {
				bgcolor = '#fff';
			}
		}
		strHTML += '<div style="background:' + bgcolor + '" class="revealer__layer"></div>';
	}
	this.revealerWrapper.innerHTML = strHTML;
	document.body.appendChild(this.revealerWrapper);
};

Revealer.prototype.reveal = function(direction, callbacktime, callback) {
	// if animating return
	if( this.isAnimating )
		return false;
	this.isAnimating = true;
	// current direction
	this.direction = direction;
	// onStart callback
	this.options.onStart(this.direction);
	// set the initial position for the layers´ parent
	var widthVal, heightVal, transform;
	if( direction === 'left' || direction === 'right' ) {
		widthVal = '100vh'
		heightVal = '100vw';
		transform = 'translate3d(-50%,-50%,0) rotate3d(0,0,1,' + (direction === 'left' ? 90 : -90) + 'deg) translate3d(0,100%,0)';
	}

	this.revealerWrapper.style.width = widthVal;
	this.revealerWrapper.style.height = heightVal;
	this.revealerWrapper.style.WebkitTransform = this.revealerWrapper.style.transform = transform;
	this.revealerWrapper.style.opacity = 1;

	// add direction and animate classes to parent
	this.revealerWrapper.classList.add('revealer--' + direction || 'revealer--right');
	this.revealerWrapper.classList.add('revealer--animate');

	// track the end of the animation for all layers
	var self = this;
	layerscomplete = 0;

	this.layers.forEach(function(layer) {
		onEndAnimation(layer, function() {
			++layerscomplete;
			if( layerscomplete === self.options.nmbLayers ) {
				self.revealerWrapper.classList.remove('revealer--' + direction || 'revealer--right');
				self.revealerWrapper.classList.remove('revealer--animate');

				self.revealerWrapper.style.opacity = 0;
				self.isAnimating = false;

				// callback
				self.options.onEnd(self.direction);
			}
		});
	});

	// reveal fn callback
	if( typeof callback === 'function') {
		if( this.callbacktimeout ) {
			clearTimeout(this.callbacktimeout);
		}
		this.callbacktimeout = setTimeout(callback, callbacktime);
	}
};

Revealer.prototype.destroy = function() {
	classie.remove(bodyEl, this.options.effect);
	window.removeEventListener('resize', this.debounceResize);
	bodyEl.removeChild(this.revealerWrapper);
};

module.exports = Revealer;
