import $ from '../core';

$.prototype.modal = function(created) {
	for (let i = 0; i < this.length; i++) {
		const target = $(this[i]).getAttr('data-target');
		$(this[i]).click(e => {
			e.preventDefault();
			if (document.body.offsetHeight > document.documentElement.clientHeight) {
				document.body.style.marginRight = `${this.calcScroll()}px`;
				$(target).setStyle('transform', `translateX(-${this.calcScroll() / 2}px)`);
			}
			$(target).fadeIn(300);
			document.body.style.overflow = 'hidden';
		});

		$(`${target} [data-close]`).click(() => {
			$(target).fadeOut(300);
			document.body.style.overflow = '';
			document.body.style.marginRight = 0;
			$(target).setStyle('transform');
			if (created) {
				$(target).remove();
			}
		});
	
		$(target).click(e => {
			if (e.target.classList.contains('modal')) {
				$(target).fadeOut(300);
				document.body.style.overflow = '';
				document.body.style.marginRight = 0;
				$(target).setStyle('transform');
				if (created) {
					$(target).remove();
				}
			}
		});
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

$.prototype.createModal = function({txtTitle, txtBody, btnCount, btnSettings} = {}) {
	for (let i = 0; i < this.length; i++) {
		let modal = document.createElement('div');
		$(modal).addClass('modal');
		$(modal).setAttr('id', $(this[i]).getAttr('data-target').slice(1));

		const buttons = [];
		for (let j = 0; j < btnCount; j++) {
			let btn = document.createElement('button');
			$(btn).addClass('btn', ...btnSettings[j][1]);
			btn.textContent = btnSettings[j][0];
			if (btnSettings[j][2]) {
				$(btn).setAttr('data-close', 'true');
			}
			if (btnSettings[j][3] && typeof(btnSettings[j][3]) === 'function') {
				$(btn).click(btnSettings[j][3]);
			}
			buttons.push(btn);
		}

		$(modal).html(
			`<div class="modal-dialog">
				<div class="modal-content">
					<button class="close" data-close>
						<span>&times;</span>
					</button>
					<div class="modal-header">
						<div class="modal-title">
							${txtTitle}
						</div>
					</div>
					<div class="modal-body">
						${txtBody}
					</div>
					<div class="modal-footer">
						
					</div>
				</div>
			</div>`
		);

		$(modal).find('.modal-footer').append(...buttons);
		document.body.appendChild(modal);
		$(this[i]).modal(true);
		$($(this[i]).getAttr('data-target')).fadeIn(300);
	}
};