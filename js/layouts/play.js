var Backbone = require('backbone');

module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('section.play',
			h('h3', 'PLAY')
		)
	}
});
