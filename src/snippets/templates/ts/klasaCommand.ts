import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], directory: string) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(client, store, file, directory, {
			enabled: $1,
			runIn: ['text', 'dm', 'group'],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: [$2],
			autoAliases: $3,
			bucket: $4,
			cooldown: $5,
			promptLimit: $6,
			promptTime: $7,
			deletable: $8,
			guarded: $9,
			nsfw: $10,
			permissionLevel: $11,
			description: $12,
			extendedHelp: $13,
			usage: $14,
			usageDelim: $15,
			quotedStringSupport: $16,
			subcommands: $17
		});
	}

	async run(message: KlasaMessage, [...params]): Promise<any> {
		// This is where you place the code you want to run for your command
		$0;
	}

	async init(): Promise<any> {
		/*
		* You can optionally define this method which will be run when the bot starts
		* (after login, so discord data is available via this.client)
		*/
	}

};
