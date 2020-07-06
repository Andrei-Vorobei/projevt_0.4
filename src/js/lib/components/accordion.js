import $ from '../core';

$.prototype.accordion = function(headActive = 'accordion-head--active', contentActive = 'accordion-content--active', paddings = 40) {
	for (let i = 0; i < this.length; i++) {
		$(this[i]).click(() => {
			$(this[i]).toggleClass(headActive);
			
			if ($(this[i]).containsClass(headActive)) {
				$(this[i].nextElementSibling).toggleClass(contentActive)
				.slideToggle(300);
			} else {
				$(this[i].nextElementSibling)
				.slideToggle(300)
				.toggleClass(contentActive);
			}
		});
	}
};

$('.accordion-head').accordion();