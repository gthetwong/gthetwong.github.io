var _ = require('underscore');
var Backbone = require('backbone');
var Revealer = require('js/revealer');
var revealer = new Revealer();

module.exports = Backbone.Cord.View.extend({
	events:{
		'mouseenter .grid__item': 'enter',
		'mouseleave .grid__item': 'leave',
		'click .grid__item': function(e) {
			e.preventDefault();
			this.reveal({direction: e.target.getAttribute('data-side'), project: e.target.getAttribute('data-project')});
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
	openProject: function(projectName){
		System.import('projects/' + projectName + '/index').then(function(){
			System.import('projects/' + projectName + '/' + projectName + '.js').then(function(project){
				this.frame = this._el('.frame', this._el('i.fa.fa-times.fa-2x.exit'));
				document.body.appendChild(this.frame);
				project.inject();
				this.frame.querySelector('.exit').addEventListener('click', function(){
					this.hide('left');
				}.bind(this));
			}.bind(this));
		}.bind(this));
	},
	reveal: function(options){
		var callbackTime = 750,
			callbackFn = function() {
				this.openProject(options.project);
			}.bind(this);
		revealer.revealerWrapper.style.visibility = 'visible';
		revealer.reveal(options.direction, callbackTime, callbackFn);
	},
	hide: function(direction) {
		var callbackTime = 750,
			callbackFn = function() {
				document.body.removeChild(this.frame);
			}.bind(this);
		revealer.reveal(direction, callbackTime, callbackFn);
	}
});
