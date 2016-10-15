var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('section.header',
			h('#title.header__title',
				h('h1', 'Graham'),
				h('h1', 'Wong'),
				h('h3', 'I love making things for the web.'),
				h('h4', 'Good thing I get to do it for a living.')),
			h('#photo.header__photo'));
	}
});
