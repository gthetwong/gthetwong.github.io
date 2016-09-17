var _ = require('underscore');
var Backbone = require('backbone');
module.exports = Backbone.Cord.View.extend({
	events:{
		'mouseenter .grid__item': 'enter',
		'mouseleave .grid__item': 'leave',
		'click .grid__item': 'openProject'
	},
	el: function(h, v){
		return h('section.work',
			h('h1', 'WORK'),
			h('.grid',
				h('.grid__item', {'data-project': 'iloafyou', 'data-side': 'left'},
					h('.title', 'I Loaf You')),
				h('.grid__item', {'data-project': 'secretLife', 'data-side': 'right'},
					h('.title', 'Secret Life of My Pet')),
				h('.grid__item', {'data-project': 'iloafyou', 'data-side': 'left'},
					h('.title', 'Loaf at first sight')),
				h('.grid__item', {'data-project': 'secretLife', 'data-side': 'right'},
					h('.title', 'Secret Life of My Pet'))
			),
			h('.preview.preview__left', 'left'),
			h('.preview.preview__right', 'right')
		);
	},
	enter: function(e){
		if (e.target !== e.currentTarget)
			return false;
		var projectName = e.target.getAttribute('data-project');
		e.target.style.zIndex = 5;
		var preview = document.querySelector('.preview__' + e.target.getAttribute('data-side'));
		preview.style.backgroundImage = 'url(assets/' + projectName + '.jpg)';
		preview.classList.add('is-active');
	},
	leave: function(e){
		if (e.target !== e.currentTarget)
			return false;
		e.target.style.zIndex = 0;
		var preview = document.querySelectorAll('[class*="preview"]');
		_.each(preview, function(el){
			el.classList.remove('is-active');
		});
	},
	openProject: function(e){
		System.import('js/projects/iloafyou');
		var something = require('projects/iloafyou');
	}
});
