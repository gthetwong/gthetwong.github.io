;(function(){
	// var work = require('js/layouts/work');
	//sense for upper bounds
	//sense for lower bounds
	//if it's upper bounds, and there's no previous slide then don't prevent default;
	//if it's lower bounds and there's a next slide, call slide down, otherwise scroll that div
	var slides = document.body.querySelectorAll('main section'),
		delta = '',
		currentSlide = 0,
		dragThreshold = 0.25,// "percentage" to drag before engaging
		dragStart = null, // used to determine touch / drag distance
		percentage = 0,
		target = undefined,
		previousTarget = '';

	function showSlide() {
	  // http://www.hugeinc.com/ideas/perspective/scroll-jacking-on-hugeinc
	  delta = 0;
	  for (var i=0; i < slides.length;i++) {
		  if(i < currentSlide) {
			  slides[i].classList.remove('active');
		  } else {
			  slides[i].classList.add('active');
		  }
	  }
	}
	function prevSlide() {
	  currentSlide--;
	  if (currentSlide < 0)
	    currentSlide = 0;
	  showSlide();
	}
	function nextSlide() {
	  currentSlide++;
	  if (currentSlide > (slides.length -1))
	    currentSlide = (slides.length -1) ;
	  showSlide();
	}
	function touchStart(e) {
		if(!e.touches || dragStart !== null)
			return false;
		var touchPoint = e.touches[0]
		dragStart = touchPoint.clientY;
		target = slides[currentSlide];
		previousTarget = slides[currentSlide -1];
	}
	function touchMove(e) {
		e.preventDefault();
		if (!e.touches || dragStart === null)
			return false;
		var touchPoint = e.touches[0];
		delta = dragStart - touchPoint.clientY;
		percentage = delta/window.innerHeight;
		if (percentage > 0) {
			target.style.height = (100 - (percentage * 100)) + '%';
			if (previousTarget)
				previousTarget.style.height = '';
		} else if (previousTarget) {
			previousTarget.style.height = (-percentage * 100) + '%';
			target.style.height = '';
		}
		return false;
	}
	function touchEnd(e) {
		dragStart = null;
		if (percentage >= dragThreshold) {
			nextSlide();
		} else if (Math.abs(percentage) >= dragThreshold) {
			prevSlide();
		} else {
			showSlide();
		}
		target.style.height = '';
		if (previousTarget)
			previousTarget.style.height = '';
		percentage = 0;
	}
	window.addEventListener('touchstart', this.touchStart.bind(this));
	window.addEventListener('touchmove', this.touchMove.bind(this));
	window.addEventListener('touchend', this.touchEnd.bind(this));
})();
