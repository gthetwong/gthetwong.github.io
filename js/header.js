var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('section.header',
			h('.header__title',
				h('h1', 'Graham'),
				h('h1', 'Wong'),
				h('h3', 'I love making things.'),
				h('h4', 'Good thing I get to do it for a living.')),
			h('img.header__photo', {src: '../background.jpg'}));
	}
});
