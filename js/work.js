var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('section.work',
			h('h1', 'WORK'),
			h('.grid',
				h('.item',
					h('.title', 'I Loaf You')),
				h('.item',
					h('.title', 'Secret Life of My Pet')),
				h('.item',
					h('.title', 'I Loaf You')),
				h('.item',
					h('.title', 'Secret Life of My Pet'))
			));
	}
});
