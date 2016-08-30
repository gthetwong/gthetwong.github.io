var Backbone = require('backbone');
require('backbone.cord');
var ProgressBar = require('progressbar');

module.exports = Backbone.Cord.View.extend({
	el: function(h, v){
		return h('section.about',
			h('.about__wrapper',
				h('.tagline',
					h('h1', 'A bit about me')),
				h('.bio',
					h('h2', "I’m a designer and developer,"),
					h('.blockquote',
						h('p', "born and raised in San Francisco. I’ve been making and taking things apart for as long as I can remember. I’m constantly trying to find new ways to keep that curiousity alive and unify my interests in art and technology. I’m super passionate about understanding complex systems, User Centered Design, Don Norman, and pretty much all things web."),
						h('p', "Most of my work these days is digital, but I still occasionally make things by hand. You can see some of my work below!")))),
			h('.about__lead'),
			h('.about__skills',
				h('h1', 'Things I can do for you:'),
				h('.skills',
					h('.skill',
						h('h3', 'HTML')),
					h('.skill',
						h('h3', 'CSS')),
					h('.skill',
						h('h3', 'JS'))
				)
			));
	}
});
