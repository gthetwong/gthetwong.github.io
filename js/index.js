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
				h('.about__wrapper',
					h('.tagline',
						h('h1', '// A bit about me')),
					h('.bio',
						h('h2', "I’m a designer and developer,"),
						h('.blockquote',
							h('p', "born and raised in San Francisco. I’ve been making and taking things apart for as long as I can remember. I’m constantly trying to find new ways to keep that curiousity alive and unify my interests in art and technology. I’m super passionate about understanding complex systems, User Centered Design, Don Norman, and pretty much all things web."),
							h('p', "Most of my work these days is digital, but I still occasionally make things by hand. You can see some of my work below!")))),
				h('.about__lead'),
				h('.about__skills',
					h('h1', '// Skills')
				)),
			h('section.work',
				h('h1', 'Work // In Progress')
			)
		);
	}
});

document.body.appendChild(new App().el);
