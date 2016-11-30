;(function(){
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
					v(about, '#about.active'),
					v(work, '#work.active'))
					// v(play, '#play'))
			);
		},
		initialize: function(){
			this.slides = this.el.querySelectorAll('main section');
			// window.addEventListener('mousewheel', this.scrollView.bind(this));
			window.addEventListener('touchstart', this.touchStart.bind(this));
			window.addEventListener('touchmove', this.touchMove.bind(this));
			window.addEventListener('touchend', this.touchEnd.bind(this));

		},
		properties: {
			viewHeight: {
				set: function(value) {
					this.header.el.style.height = value + 60 + 'px';
					this._viewHeight = value;
				}
			},
			active: '',
			delta: '',
			currentSlide: 0,
			dragThreshold: 0.25,// "percentage" to drag before engaging
			dragStart: {
				value: null
			},	 // used to determine touch / drag distance
			percentage: 0,
			target: undefined,
			previousTarget: '',
			slides: ''
		},
		showSlide: function() {
		  // http://www.hugeinc.com/ideas/perspective/scroll-jacking-on-hugeinc
		  this.delta = 0;
		  _.each(this.slides, function(slide, index){
				if (index < this.currentSlide) {
					slide.classList.remove('active');
				} else {
					slide.classList.add('active');
				}
		  }, this);
		  return this;
		},
		prevSlide: function() {
		  this.currentSlide--;
		  if (this.currentSlide < 0)
		    this.currentSlide = 0;
		  this.showSlide();
		},
		nextSlide: function() {
		  this.currentSlide++;
		  if (this.currentSlide > (this.slides.length -1))
		    this.currentSlide = (this.slides.length -1) ;
		  this.showSlide();
		},
		touchStart: function(e) {
			if(!e.touches || this.dragStart !== null)
				return false;
			var touchPoint = e.touches[0]
			this.dragStart = touchPoint.clientY;
			this.target = this.slides[this.currentSlide];
			this.previousTarget = this.slides[this.currentSlide -1];
		},
		touchMove: function(e) {
			e.preventDefault();
			if (!e.touches || this.dragStart === null)
				return false;
			var touchPoint = e.touches[0];
			this.delta = this.dragStart - touchPoint.clientY;
			this.percentage = this.delta/window.innerHeight;
			if (this.percentage > 0) {
				this.target.style.height = (100 - (this.percentage * 100)) + '%';
				if (this.previousTarget)
					this.previousTarget.style.height = '';
			} else if (this.previousTarget) {
				this.previousTarget.style.height = (-this.percentage * 100) + '%';
				this.target.style.height = '';
			}
			//sense for upper bounds
			//sense for lower bounds
			//if it's upper bounds, and there's no previous slide then don't prevent default;
			//if it's lower bounds and there's a next slide, call slide down, otherwise scroll that div
			return false;
		},
		touchEnd: function(e) {
			this.dragStart = null;
			if (this.percentage >= this.dragThreshold) {
				this.nextSlide();
			} else if (Math.abs(this.percentage) >= this.dragThreshold) {
				this.prevSlide();
			} else {
				this.showSlide();
			}
			this.target.style.height = '';
			if (this.previousTarget)
				this.previousTarget.style.height = '';
			this.percentage = 0;
		}
	});
	window.app = new App();
	document.body.appendChild(app.el);
})();
