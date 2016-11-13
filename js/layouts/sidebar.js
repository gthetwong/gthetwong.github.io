var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('.sidebar',
			h('a.sidebar__icon.fa.fa-envelope', {href: "mailto:grahamtyler.wong@gmail.com?subject=Hey%20there%2C%20let%27s%20get%20in%20touch", target: '_blank', rel:"noopener noreferrer"}),
			h('a.sidebar__icon.fa.fa-twitter', {href: '//twitter.com/grahamtylerwong', target: '_blank', rel:"noopener noreferrer"}),
			h('a.sidebar__icon.fa.fa-github', {href: '//github.com/gthetwong', target: '_blank', rel:"noopener noreferrer"}),
			h('a.sidebar__icon.fa.fa-linkedin', {href: '//linkedin.com/in/grahamtylerwong', target: '_blank', rel:"noopener noreferrer"}));
	}
});
