window.cordCompatibilityMode = true;

var _ = require('underscore');
var Backbone = require('backbone');
require('backbone.cord');

var App = Backbone.Cord.View.extend({
	className: 'app',
	el: function(h){
		return h('main',
			h('section.header',
				h('.header__name',
					h('h1', 'GRAHAM'),
					h('h1', 'WONG')),
				h('img.header__photo', {src: '../background.jpg'}),
				h('.header__title',
					h('.title__wrapper',
						h('h3', 'DESIGN'),
						h('h3', '&'),
						h('h3', 'DEVELOPMENT')
					)
				),
				h('.header__decoration', '')
			)
		);
	}
});

document.body.appendChild(new App().el);
