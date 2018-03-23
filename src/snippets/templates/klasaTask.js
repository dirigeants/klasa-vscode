const { Task } = require('klasa');

module.exports = class extends Task {

	constructor(...args) {
		super(...args, { enabled: $1 });
	}

	async run(data) {
		// This is where you place the code you want to run for your task
		$0;
	}

	async init() {
		/*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
	}

};
