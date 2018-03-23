const { Extendable } = require('klasa');

module.exports = class extends Extendable {

	constructor(...args) {
		super(...args, ['Message'], {
			enabled: $1,
			klasa: $2
		});
	}

	$2extend() {
		// `this` refers to the parent class, and not this one. You cannot use super
		$0;
	}

};
