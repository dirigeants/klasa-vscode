const { Finalizer } = require('klasa');

module.exports = class extends Finalizer {

	constructor(...args) {
		super(...args, { enabled: $1 });
	}

	async run(msg, mes, start) {
		// This is where you place the code you want to run for your finalizer
		$0;
	}

	async init() {
		// You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
	}

};
