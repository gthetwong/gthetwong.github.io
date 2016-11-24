window.cordCompatibilityMode = true;

var _ = require('underscore');
var Backbone = require('backbone');
require('backbone.cord');
var sidebar = require('js/layouts/sidebar');
var header = require('js/layouts/header');
var about = require('js/layouts/about');
var work = require('js/layouts/work');
var play = require('js/layouts/play');

var App = Backbone.Cord.View.extend({
	className: 'app',
	el: function(h, v){
		return h('',
			v(sidebar, "#sidebar"),
			h('main',
				v(header, '#header.active'),
				v(about, '#about'),
				v(work, '#work'),
				v(play, '#play'))
		);
	},
	initialize: function(){
		// this.viewHeight = window.innerHeight;
		window.addEventListener('resize', _.throttle(function(e){
			// if (Math.abs(this.viewHeight - window.innerHeight) > 60 && window.innerWidth < 600){
			// // if (window.innerWidth < 600){
			// 	this.viewHeight = window.innerHeight;
			// }
		}.bind(this), 500));
		window.addEventListener('mousewheel', this.scrollView.bind(this));
		// window.addEventListener('touchend', this.scrollHeader.bind(this));
	},
	properties: {
		viewHeight: {
			set: function(value) {
				this.header.el.style.height = value + 60 + 'px';
				this._viewHeight = value;
			}
		},
		active: {
			set: function(){

			}
		},
		delta: '',
		currentSlide: 0
	},
	showSlide() {
		// http://www.hugeinc.com/ideas/perspective/scroll-jacking-on-hugeinc
		this.delta = 0;
		_.each(this.subviews, function(view, index){
			if (index >= this.currentSlide)
				view.el.classList.toggle('active');
		}, this);
		return this;
	},
	scrollView: function(e){
		if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
			this.delta--;
			if (Math.abs(this.delta) >= scrollThreshold)
				this.prevSlide();
		} else {
			this.delta++;
			if (this.delta >= scrollThreshold)
				this.nextSlide();
		}
		// Prevent page from scrolling
		return false;
	},
	prevSlide: function() {
		thiis.currentSlide--;
		if (thiis.currentSlide < 0)
			thiis.currentSlide = 0;
		this.showSlide();
	},
	nextSlide: function() {
		this.currentSlide++;
		if (this.currentSlide > numSlides)
			this.currentSlide = numSlides;
		this.showSlide();
	}
});
window.app = new App();
document.body.appendChild(app.el);
