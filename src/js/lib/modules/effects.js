import $ from '../core';

$.prototype.animateOverTime = function(dur, cb, fin) {
	let timeStart;

	function _animateOverTime(time) {
		if (!timeStart) {
			timeStart = time;
		}

		let timeElapsed = time - timeStart,
			 complection = Math.min(timeElapsed / dur, 1);

		cb(complection);

		if (timeElapsed < dur) {
			requestAnimationFrame(_animateOverTime);
		} else {
			if (typeof fin === 'function') {
				fin();
			}
		}
	}

	return _animateOverTime;
};

$.prototype.fadeIn = function(dur, display, fin) {
	for (let i = 0; i < this.length; i++) {
		this[i].style.display = display || 'block';
		this[i].style.height = this[i].scrollHeight + 'px';
		this[i].style.height = this[i].scrollwidth + 'px';

		const _fadeIn = (complection) => {
			this[i].style.opacity = complection;
		};

		const anim = this.animateOverTime(dur, _fadeIn, fin);
		requestAnimationFrame(anim);
	}

	return this;
};

$.prototype.fadeOut = function(dur, fin) {
	for (let i = 0; i < this.length; i++) {
		
		const _fadeOut = (complection) => {
			this[i].style.opacity = 1 - complection;
			if (complection === 1) {
				this[i].style.display = 'none';
			}
		};

		const anim = this.animateOverTime(dur, _fadeOut, fin);
		requestAnimationFrame(anim);
	}

	return this;
};

$.prototype.fadeToggle = function(dur, display, fin) {
	for (let i = 0; i < this.length; i++) {
		if (window.getComputedStyle(this[i]).display === 'none') {
			$(this[i]).fadeIn(dur, display, fin);
		} else {
			$(this[i]).fadeOut(dur, fin);
		}
	}

	return this;
};

$.prototype.slideIn = function(dur, display, fin) {
	for (let i = 0; i < this.length; i++) {
		this[i].style.display = display || 'block';

		const _slideIn = (complection) => {
			let height = complection * this[i].scrollHeight;
			this[i].style.height = height + 'px';
			this[i].style.overflow = '';
		};


		const anim = this.animateOverTime(dur, _slideIn, fin);
		requestAnimationFrame(anim);
	}

	return this;
};

$.prototype.slideOut = function(dur, fin) {
	for (let i = 0; i < this.length; i++) {

		const _slideOut = (complection) => {
			this[i].style.overflow = 'hidden';
			
			let height = (1 - complection) * this[i].scrollHeight;
			
			this[i].style.height = height + 'px';

			if (complection === 1) {
				this[i].style.display = 'none';
			}
		};

		const anim = this.animateOverTime(dur, _slideOut, fin);
		requestAnimationFrame(anim);
	}

	return this;
};

$.prototype.slideToggle = function(dur, display, fin) {
	for (let i = 0; i < this.length; i++) {
		if (window.getComputedStyle(this[i]).display === 'none' || 
			window.getComputedStyle(this[i]).height === '0px') {
			$(this[i]).slideIn(dur, display, fin);
		} else {
			$(this[i]).slideOut(dur, fin);
		}
	}

	return this;
};
