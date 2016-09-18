var _ = require('underscore');
var Backbone = require('backbone');
var Revealer = require('revealer');
var revealer = new Revealer();

module.exports = Backbone.Cord.View.extend({
	events:{
		'mouseenter .grid__item': 'enter',
		'mouseleave .grid__item': 'leave',
		'click .grid__item': function(e) {
			e.preventDefault();
			// this.reveal(e.target.getAttribute('data-side'));
			this.reveal('right');
		}
	},
	el: function(h, v){
		return h('section.work',
			h('h1', 'WORK'),
			h('.grid',
				h('.grid__item', {'data-project': 'iloafyou', 'data-side': 'right'},
					h('.title', 'I Loaf You')),
				h('.grid__item', {'data-project': 'secretLife', 'data-side': 'left'},
					h('.title', 'Secret Life of My Pet')),
				h('.grid__item', {'data-project': 'iloafyou', 'data-side': 'left'},
					h('.title', 'Loaf at first sight')),
				h('.grid__item', {'data-project': 'secretLife', 'data-side': 'right'},
					h('.title', 'Secret Life of My Pet'))
			)
		);
	},
	enter: function(e){
	},
	leave: function(e){
	},
	openProject: function(e){
		System.import('js/projects/iloafyou');
		var project = require('projects/iloafyou');
		this.frame = document.createElement('div');
		this.frame.className = 'frame';
		document.body.appendChild(this.frame);
		project.inject();
		this.frame.addEventListener('click', function(){
			this.hide('left');
		}.bind(this));
	},
	reveal: function(direction){
		var callbackTime = 750,
			callbackFn = function() {
				this.openProject();
			}.bind(this);
		revealer.revealerWrapper.style.visibility = 'visible';
		revealer.reveal(direction, callbackTime, callbackFn);
	},
	hide: function(direction) {
		var callbackTime = 750,
			callbackFn = function() {
				document.body.removeChild(this.frame);
			}.bind(this);
		revealer.reveal(direction, callbackTime, callbackFn);
	}
});
