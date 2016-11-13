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
				v(header, '#header', {onclick: 'scrollHeader'}),
				v(about, '#about'),
				v(work, '#work'),
				v(play, '#play'))
		);
	},
	initialize: function(){
		this.viewHeight = window.innerHeight;
		window.addEventListener('resize', _.throttle(function(e){
			// if (Math.abs(this.viewHeight - window.innerHeight) > 60 && window.innerWidth < 600){
			if (window.innerWidth < 600){
				this.viewHeight = window.innerHeight;
			}
		}.bind(this), 500));
		// window.addEventListener('mousewheel', this.scrollHeader.bind(this));
		// window.addEventListener('scroll', this.scrollHeader.bind(this));
	},
	properties: {
		viewHeight: {
			set: function(value) {
				this.header.el.style.height = value + 'px';
				// if( window.innerWidth < 1550)
				// 	this.about.el.style.marginTop = value + 'px';
				// else
				// 	this.about.el.style.marginTop = 'auto';
				this._viewHeight = value;
			}
		}
	},
	scrollHeader: _.throttle( function(e){
		if(window.innerWidth < 600)
			alert('scrolling');
	}, 500)
});
window.app = new App();
document.body.appendChild(app.el);
