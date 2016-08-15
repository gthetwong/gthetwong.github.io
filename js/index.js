window.cordCompatibilityMode = true;

var _ = require('underscore');
var Backbone = require('backbone');
require('backbone.cord');

var App = Backbone.Cord.View.extend({
	className: 'app',
	el: function(h){
		return h('main',
			h('.sidebar',
				h('.sidebar__icon.fa.fa-envelope-o'),
				h('.sidebar__icon.fa.fa-twitter'),
				h('.sidebar__icon.fa.fa-github')),
			h('section.header',
				h('.header__title',
					h('h1', 'Graham'),
					h('h1', 'Wong'),
					h('h3', 'I love making things.'),
					h('h4', 'Good thing I get to do it for a living.')),
				h('img.header__photo', {src: '../background.jpg'})
			),
			h('section.about',
				h('.about__tagline',
					h('h1', '// A LITTLE ABOUT ME'),
					h('h3', 'Good thing I get to do it for a living.')),
				h('p.about__bio', "My name is Graham. I’m a designer and developer from San Francisco. Since I was a youngster, I’ve been intrigued by making things and taking things apart. Now that I’m older, I’m constantly trying to find new ways to keep that curiousity alive and unify my interests in art and technology. I’m super passionate about User Centered Design, Don Norman, and pretty much all things web. And even though most of my work is digital now, I still occasionally enjoy making things by hand.")
			),
			h('section.work',
				h('h1', 'Work // In Progress')
			)
		);
	}
});

document.body.appendChild(new App().el);
