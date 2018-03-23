const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: $1,
			runIn: ['text', 'dm', 'group'],
			cooldown: $2,
			aliases: [$3],
			permLevel: $4,
			botPerms: [],
			requiredSettings: [],
			description: $5,
			usage: $6,
			usageDelim: $7,
			extendedHelp: $8
		});
	}

	async run(msg, [...params]) {
		// This is where you place the code you want to run for your command
		$0;
	}

	async init() {
		// You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client)
	}

};
