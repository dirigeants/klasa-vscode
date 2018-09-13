const { Extendable } = require('klasa');

module.exports = class extends Extendable {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 */
		super(...args, {
			enabled: $1,
			appliesTo: [$2]
		});
	}

	$3() {
		// `this` refers to the parent class, and not this one. You cannot use super.
		$0;
	}

};
