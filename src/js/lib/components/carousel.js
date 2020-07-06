import $ from '../core';

$.prototype.carousel = function () {
	for (let i = 0; i < this.length; i++) {
		const width = $(this[i]).find('.carousel-inner').getStyle('width'),
				slides = $(this[i]).find('.carousel-item'),
				slidesField = $(this[i]).find('.carousel-slides'),
				dots = $(this[i]).find('.carousel-indicators li');

		slidesField.setStyle('width', (100 * slides.length + '%'));
		slides.setStyle('width', width);

		let offset = 0,
			 slideIndex = 0;

		$(this[i]).find('[data-slide="next"]').click((e) => {
			e.preventDefault();
			if (offset == (+width.replace(/\D/g, '') * (slides.length - 1))) {
				offset = 0;
			} else {
				offset += (+width.replace(/\D/g, ''));
			}

			slidesField.setStyle('transform', `translateX(-${offset}px)`);

			if (slideIndex == slides.length - 1) {
				slideIndex = 0;
			} else {
				slideIndex++;
			}

			$(dots[slideIndex]).addClass('active').siblings().removeClass('active');
		});

		$(this[i]).find('[data-slide="prev"]').click((e) => {
			e.preventDefault();
			if (offset == 0) {
				offset = +width.replace(/\D/g, '') * (slides.length - 1);
			} else {
				offset -= (+width.replace(/\D/g, ''));
			}

			slidesField.setStyle('transform', `translateX(-${offset}px)`);

			if (slideIndex == 0) {
				slideIndex = slides.length - 1;
			} else {
				slideIndex--;
			}

			$(dots[slideIndex]).addClass('active').siblings().removeClass('active');
		});

		dots.click(e => {
			slideIndex = $(e.target).getAttr('data-slide-to');
			offset = +width.replace(/\D/g, '') * slideIndex;
			slidesField.setStyle('transform', `translateX(-${offset}px)`);
			$(dots[slideIndex]).addClass('active').siblings().removeClass('active');
		});
	}
};

$('.carousel').carousel();