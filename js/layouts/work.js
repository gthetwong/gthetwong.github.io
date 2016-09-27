var _ = require('underscore');
var Backbone = require('backbone');
var Revealer = require('js/revealer');
var revealer = new Revealer();

module.exports = Backbone.Cord.View.extend({
	events:{
		'mouseenter .grid__item': 'enter',
		'mouseleave .grid__item': 'leave',
		'click .grid__item': function(e) {
			var el = e.target;
			if (e.target !== e.currentTarget)
				el = e.currentTarget;
			this.reveal({direction: el.getAttribute('data-side'), project: el.getAttribute('data-project')});
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
	properties: {
		demo: {
			//when a project is given the class "is-active", we set reveal to true
			//the set function finds the element with is-active
			//figures out the data-side stuff? if it's right, then opposite is left? hashmap? getOpposite function?
			//calls open project and hands updated values?

			set: function(value) {
				this._reveal = value;
			}
		}
	},
	enter: function(e){
	},
	leave: function(e){
	},
	generateFrame: function(project){
		return this._el('.frame',
			this._el('i.fa.fa-times.fa-2x.frame__exit'),
			this._el('.frame__content', project.main()),
			this._el('.frame__summary',
				this._el('h1.summary__title', project.title),
				this._el('.summary__description').appendChild(project.summary()))
		);
	},
	openProject: function(projectName){
		System.import('projects/' + projectName + '/index').then(function(){
			System.import('projects/' + projectName + '/' + projectName + '.js').then(function(project){
				this.frame = this.generateFrame(project);
				document.body.appendChild(this.frame);
				this.frame.querySelector('.frame__exit').addEventListener('click', function(){
					this.hide('left');
				}.bind(this));
			}.bind(this));
		}.bind(this));
	},
	reveal: function(options){
		var callbackTime = 500,
			callbackFn = function() {
				this.openProject(options.project);
			}.bind(this);
		revealer.revealerWrapper.style.visibility = 'visible';
		revealer.reveal(options.direction, callbackTime, callbackFn);
	},
	hide: function(direction) {
		var callbackTime = 500,
			callbackFn = function() {
				document.body.removeChild(this.frame);
			}.bind(this);
		revealer.reveal(direction, callbackTime, callbackFn);
	}
});
