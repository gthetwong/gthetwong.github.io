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
		return h('main',
			v(sidebar),
			v(header),
			v(about),
			v(work)
		);
	},
	render: function(){
		this.ready = true;
	},
	properties: {
		ready: {
			set: function(value){
				if (value)
					for (child in this.subviews) {
						this.subviews[child].ready = true;
					}
			},
			value: false
		}
	}
});
var app = new App();
document.body.appendChild(app.el);
app.render();
