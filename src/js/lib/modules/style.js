import $ from '../core';

$.prototype.getStyle = function(style) {
	for (let i = 0; i < this.length; i++) {
		switch(style) {
			case 'width':
				return window.getComputedStyle(this[i]).width;

			case 'height':
				return window.getComputedStyle(this[i]).height;
		}
	}
};

$.prototype.setStyle = function(style, value) {
	for (let i = 0; i < this.length; i++) {

		switch(style) {
			case 'width':
				if (!value) {
					this[i].style.width = '';
					break;
				}
				this[i].style.width = value;
				break;

			case 'height':
				if (!value) {
					this[i].style.height = '';
					break;
				}
				this[i].style.height = value;
				break;

			case 'transform':
				if (!value) {
					this[i].style.transform = '';
					break;
				}
				this[i].style.transform = value;
				break;
		}
	}

	return this;
};