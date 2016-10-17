var Backbone = require('backbone');

module.exports = Backbone.Cord.View.extend({
	className: 'about',
	el: function(h, v){
		return h('section',
			h('#wrapper.about__wrapper',
				h('.tagline',
					h('h3', 'A bit about me')),
				h('.bio',
					h('h4', "I've been making things as long as I can remember..."),
					h('.blockquote',
						h('p', "I’ve been making and taking things apart for as long as I can remember. I’m constantly trying to find new ways to keep that curiousity alive and unify my interests in art and technology. I’m super passionate about understanding complex systems, Don Norman and User Centered Design, and pretty much all things web."),
						h('p', "Most of my work these days is digital, but I still occasionally make things by hand. You can see some of my work below!")))),
			h('.about__lead'),
			h('.about__skills',
				h('h4', 'Skills'),
				h('ul.skills',
					h('li.skill', 'User Research'),
					h('li.skill', 'Rapid Prototyping'),
					h('li.skill', 'Usability Testing'),
					h('li.skill', 'Front-End & MVC Architecture'),
					h('li.skill', 'BEM & SMACSS Patterns'),
					h('li.skill', 'Responsive Web Design'),
					h('li.skill', 'Build Systems')
				),
				h('.divider'),
				h('h4', 'Tools'),
				h('ul.skills',
					h('li.skill', 'HTML5'),
					h('li.skill', 'CSS3/SCSS/PostCSS'),
					h('li.skill', 'JS(ECMA5/6)'),
					h('li.skill', 'BackboneJS'),
					h('li.skill', 'Gulp'),
					h('li.skill', 'Bower'),
					h('li.skill', 'NPM'),
					h('li.skill', 'JSPM'),
					h('li.skill', 'Sketch 3'),
					h('li.skill', 'FramerJS')
				)
			));
	},
	properties: {
		viewHeight: {
			set: function(value){
				this._viewHeight = value + 'px';
			}
		}
	},
	styles: {
		marginTop: '{_viewHeight}'
	}
});
