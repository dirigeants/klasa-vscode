const { Language } = require('klasa');

module.exports = class extends Language {

	constructor(...args) {
		/**
		 * Any default options can be omitted completely.
		 */
		super(...args, { enabled: $1 });

		this.language = {
			DEFAULT: (key) => `${key} has not been localized for $2 yet.`,
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

}
