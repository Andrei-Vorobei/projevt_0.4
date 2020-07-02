import $ from '../core';

$.prototype.on = function(eventName, callback) {
	if (!eventName || !callback) {
		return this;
	}

	for (let i = 0; i < this.length; i++) {
		this[i].addEventListener(eventName, callback);
	}

	return this;
};

$.prototype.off = function(eventName, callback) {
	if (!eventName || !callback) {
		return this;
	}

	for (let i = 0; i < this.length; i++) {
		this[i].removeEventListener(eventName, callback);
	}

	return this;
};

$.prototype.click = function(handler) {
	for (let i = 0; i < this.length; i++) {
		if (handler) {
			this[i].addEventListener('click', handler);
		} else {
			this[i].click();
		}
	}

	return this;
};

$.prototype.setAttr = function(attr, value = '') {
	for (let i = 0; i < this.length; i++) {
		if (!attr) {
			return this;
		}

		this[i].setAttribute(attr, value);
	}

	return this;
};

$.prototype.getAttr = function(attrName) {
	
	for (let i = 0; i < this.length; i++) {
		return this[i].getAttribute(attrName);
	}
};

$.prototype.removeAttr = function(attr) {
	for (let i = 0; i < this.length; i++) {
		if (!attr) {
			return this;
		}

		this[i].removeAttribute(attr);
	}

	return this;
};

$.prototype.toggleAttr = function(attr, value = '') {
	for (let i = 0; i < this.length; i++) {
		if (!attr) {
			return this;
		}
		
		if (this[i].hasAttribute(attr)) {
			this[i].removeAttribute(attr);
		} else {
			this[i].setAttribute(attr, value);
		}
	}

	return this;
};

$.prototype.getAllAttrs = function() {
	for (let i = 0; i < this.length; i++) {
		for (let attr of this[i].attributes) {
			console.log( `${attr.name} = "${attr.value}"` );
		}
	}

	return this;
};

$.prototype.removeAllAttrs = function() {
	for (let i = 0; i < this.length; i++) {
		let attributes = [];

		for (let attr of this[i].attributes) {
			attributes.push(attr.name);
		}

		attributes.forEach(attr => {
			this[i].removeAttribute(attr);
		});
	}

	return this;
};