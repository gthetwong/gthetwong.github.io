var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('section.header.loading',
			h('.header__title',
				h('h1', 'Graham'),
				h('h1', 'Wong'),
				h('h3', 'I love making things for the web.'),
				h('h4', 'Good thing I get to do it for a living.')),
			h('.header__photo'));
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
