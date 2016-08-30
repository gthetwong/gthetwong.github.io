window.cordCompatibilityMode = true;

var _ = require('underscore');
var Backbone = require('backbone');
require('backbone.cord');
var sidebar = require('sidebar');
var header = require('header');
var about = require('about');
var work = require('work');

var App = Backbone.Cord.View.extend({
	className: 'app',
	el: function(h, v){
		return h('main',
			v(sidebar),
			v(header),
			v(about),
			v(work)
		);
	}
});

document.body.appendChild(new App().el);
