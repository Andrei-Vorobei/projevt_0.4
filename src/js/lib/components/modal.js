import $ from '../core';

$.prototype.modal = function() {
	for (let i = 0; i < this.length; i++) {
		const target = $(this[i]).getAttr('data-target');
		$(this[i]).click(e => {
			e.preventDefault();
			if (document.body.offsetHeight > document.documentElement.clientHeight) {
				document.body.style.marginRight = `${this.calcScroll()}px`;
				$('.modal').moveX(this.calcScroll());
			}
			$(target).fadeIn(300);
			document.body.style.overflow = 'hidden';
		});
	}

	$('[data-close]').click(() => {
		$('.modal').fadeOut(300);
		document.body.style.overflow = '';
		document.body.style.marginRight = 0;
		$('.modal').moveX();
	});

	$('.modal').click(e => {
		if (e.target.classList.contains('modal')) {
			$('.modal').fadeOut(300);
			document.body.style.overflow = '';
			document.body.style.marginRight = 0;
			$('.modal').moveX();
		}
	});
};

$.prototype.marginRight = function(margin) {
	for (let i = 0; i < this.length; i++) {
		this[i].style.marginRight = `${margin}px`;
	}
};

$.prototype.positionRight = function(right) {
	for (let i = 0; i < this.length; i++) {
		this[i].style.right = `${right}px`;
	}
};

$.prototype.moveX = function(move) {
	for (let i = 0; i < this.length; i++) {
		if (!move) {
			this[i].style.transform = `TranslateX(0)`;
		} else {
			this[i].style.transform = `TranslateX(${-move}px)`;
		}
	}
};

$.prototype.calcScroll = function() {
	let div = document.createElement('div');

	div.style.width = '50px';
	div.style.height = '50px';
	div.style.overflowY = 'scroll';
	div.style.visibility = 'hidden';

	document.body.appendChild(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;
	div.remove();

	return scrollWidth;
};

$('[data-toggle="modal"]').modal();