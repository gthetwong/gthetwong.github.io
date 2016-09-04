var Backbone = require('backbone');
var projects = require('projects/projects');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('section.work',
			h('h1', 'WORK'),
			h('.grid',
				h('.item', {onmouseenter:'hover', 'data-project': 'iLoafYou'},
					h('.title', 'I Loaf You')),
				h('.item', {onmouseenter:'hover', 'data-project': 'secretLife'},
					h('.title', 'Secret Life of My Pet')),
				h('.item',
					h('.title', 'Loaf at first sight')),
				h('.item',
					h('.title', 'Secret Life of My Pet'))
			));
	},
	hover: function(e){
		console.log(e);

		// projects[e.target.getAttribute('data-project')];
	}
});
