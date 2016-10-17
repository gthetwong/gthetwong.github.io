window.cordCompatibilityMode = true;

var $ = require('jquery');
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
				v(header, '#header'),
				v(about, '#about'),
				v(work, '#work'),
				v(play, '#play'))
		);
	},
	initialize: function(){
		this.header.viewHeight = window.innerHeight;
		this.about.viewHeight = window.innerHeight;

		window.addEventListener('resize', _.throttle(function(e){
			if (Math.abs(this.header.viewHeight - window.innerHeight) > 65){
				this.header.viewHeight = window.innerHeight;
				this.about.viewHeight = window.innerHeight;
			}
		}.bind(this), 500));
	}
});
window.app = new App();
document.body.appendChild(app.el);
app.render();
