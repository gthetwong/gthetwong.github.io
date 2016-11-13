var _ = require('underscore');
var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	className: 'header',
	el: function(h, v){
		return h('section',
			h('#title.header__title',
				h('h1', 'Hi, I\'m Graham.'),
				h('h3', 'I love making things for the web.'),
				h('h4', 'It\s a good thing I do it for a living.')),
			h('#photo.header__photo'));
	}
});
