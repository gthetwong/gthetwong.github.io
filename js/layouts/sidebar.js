var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('.sidebar.loading',
			h('.sidebar__icon.fa.fa-envelope-o'),
			h('.sidebar__icon.fa.fa-twitter'),
			h('.sidebar__icon.fa.fa-github'));
	},
	properties: {
		ready: {
			set: function(value) {
				this._ready = value;
				setTimeout(function(){
					this.el.classList.remove('loading');
				}.bind(this), 500);
			}
		}
	}
});
