import { Inhibitor, InhibitorStore, KlasaClient, KlasaMessage, Command } from 'klasa';

export default class extends Inhibitor {

	constructor(client: KlasaClient, store: InhibitorStore, file: string[], directory: string) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(client, store, file, directory, {
			enabled: $1,
			spamProtection: $2
		});
	}

	async run(message: KlasaMessage, command: Command): Promise<void | boolean | string> {
		// This is where you place the code you want to run for your inhibitor
		$0;
	}

	async init() {
		/*
     * You can optionally define this method which will be run when the bot starts
     * (after login, so discord data is available via this.client)
     */
	}

};
