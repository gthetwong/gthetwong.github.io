window.cordCompatibilityMode = true;

var _ = require('underscore');
var Backbone = require('backbone');
require('backbone.cord');
var sidebar = require('js/layouts/sidebar');
var header = require('js/layouts/header');
var about = require('js/layouts/about');
var work = require('js/layouts/work');

var App = Backbone.Cord.View.extend({
	className: 'app',
	el: function(h, v){
		return h('',
			v(sidebar),
			h('main',
				v(header),
				v(about),
				v(work))
		);
	}
});
var app = new App();
document.body.appendChild(app.el);
app.render();
