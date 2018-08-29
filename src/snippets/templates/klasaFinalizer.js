const { Finalizer } = require('klasa');

module.exports = class extends Finalizer {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(...args, { enabled: $1 });
	}

	async run(message, response, runTime) {
		// This is where you place the code you want to run for your finalizer
		$0;
	}

};
