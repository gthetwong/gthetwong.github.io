window.cordCompatibilityMode = true;

var _ = require('underscore');
var Backbone = require('backbone');
require('backbone.cord');

var App = Backbone.Cord.View.extend({
	className: 'app',
	el: function(h){
		return h('main',
			h('section.header',
				h('.overlay',
					h('.wrapper',
						h('h1', 'GRAHAM WONG'),
						h('span', 'Unifying Art & Tech')
					),
					//these are ripe for some scrolling effects
					h('.floating', {'data-index': 1}, ''),
					h('.floating', {'data-index': 2}, '')
				)
			),
			h('section.about')
		);
	}
});

document.body.appendChild(new App().el);
