import { Extendable, ExtendableStore, KlasaClient } from 'klasa';

export default class extends Extendable {

	constructor(client: KlasaClient, store: ExtendableStore, file: string[], directory: string) {
		/**
		 * Any default options can be omitted completely.
		 */
		super(client, store, file, directory, {
			enabled: $1,
			appliesTo: [$2]
		});
	}

	$3$4() {
		// `this` refers to the parent class, and not this one. You cannot use super.
		$0;
	}

};
