const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(...args, {
			enabled: $1,
			ignoreBots: $2,
			ignoreSelf: $3,
			ignoreOthers: $4,
			ignoreWebhooks: $5,
			ignoreEdits: $6
		});
	}

	async run(msg) {
		// This is where you place the code you want to run for your monitor
		$0;
	}

	async init() {
		/*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
	}

};
