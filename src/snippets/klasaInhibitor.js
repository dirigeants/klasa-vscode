const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {

	constructor(...args) {
		super(...args, {
			enabled: $1,
			spamProtection: $2
		});
	}

	async run(msg, cmd) {
		// This is where you place the code you want to run for your inhibitor
		$0;
	}

	async init() {
		// You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
	}

};
