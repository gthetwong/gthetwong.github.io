var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('.sidebar',
			h('.sidebar__icon.fa.fa-envelope-o'),
			h('.sidebar__icon.fa.fa-twitter'),
			h('.sidebar__icon.fa.fa-github'));
	}
});
