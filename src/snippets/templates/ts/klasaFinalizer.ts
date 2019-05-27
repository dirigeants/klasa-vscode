import { Command, Finalizer, FinalizerStore, KlasaClient, KlasaMessage, Stopwatch } from 'klasa';

export default class extends Finalizer {

	constructor(client: KlasaClient, store: FinializerStore, file: string[], directory: string) {
		/**
		 * Any default options can be omitted completely.
		 * if all options are default, you can omit the constructor completely
		 */
		super(client, store, file, directory, { enabled: $1 });
	}

	async run(message: KlasaMessage, command: Command, response: KlasaMessage | KlasaMessage[] | null, runTime: Stopwatch): Promise<void> {
		// This is where you place the code you want to run for your finalizer
		$0;
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};
