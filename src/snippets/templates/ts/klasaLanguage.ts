import { Language, LanguageStore, KlasaClient } from 'klasa';

export default class extends Language {

	language: any;

	constructor(client: KlasaClient, store: LanguageStore, file: string[], directory: string) {
		/**
		 * Any default options can be omitted completely.
		 */
		super(client, store, file, directory, { enabled: $1 });

		this.language = {
			DEFAULT: (key: string) => `${key} has not been localized for $2 yet.`,
			DEFAULT_LANGUAGE: 'Default Language'
			// ...
		};

		/*
		 * please note, that as the Language is loaded before the client is loaded using this.client
		 * in a literal sense may throw errors such as: this.client.user.username would throw
		 * \"can't get property username of null\"
		 */
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}

};
