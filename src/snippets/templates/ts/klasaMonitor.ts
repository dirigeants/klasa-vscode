import { Monitor, MonitorStore, KlasaClient, KlasaMessage } from 'klasa'

export default class extends Monitor {

	constructor(client: KlasaClient, store: MonitorStore, file: string[], directory: string) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(client, store, file, directory, {
			enabled: $1,
			ignoreBots: $2,
			ignoreSelf: $3,
			ignoreOthers: $4,
			ignoreWebhooks: $5,
			ignoreEdits: $6
		});
	}

	async run(message: KlasaMessage) {
	// This is where you place the code you want to run for your monitor
	$7
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};
