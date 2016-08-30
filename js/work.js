var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('section.work',
			h('h1', 'WORK'));
	}
});
