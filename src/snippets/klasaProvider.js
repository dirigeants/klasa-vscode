const { Provider } = require('klasa');

module.exports = class extends Provider {

	constructor(...args) {
		super(...args, {
			enabled: $1,
			sql: $2,
			description: '$3'
		});
	}

	init() {
		// You can optionally define this method which will be run when the bot starts (after login, so discord data is available via this.client).
	}

	shutdown() {
		// You can optionally define this method which will be run when the provider is removed from the ProviderStore.
	}

	hasTable(table) {
		// Checks if a table exists.
	}

	createTable(table) {
		// Create a new table.
	}

	deleteTable(table) {
		// Delete a table.
	}

	getAll(table) {
		// Get all records from a table.
	}

	get(table, id) {
		// Get a record from a table.
	}

	has(table, id) {
		// Check if the record exists.
	}

	getRandom(table) {
		// Get a random record from a table.
	}

	create(table, id, data) {
		// Insert a new record.
	}

	set(...args) {
		return this.create(...args);
	}

	insert(...args) {
		return this.create(...args);
	}

	update(table, id, data) {
		// Update a record.
	}

	replace(table, id, data) {
		// Replace all the data from a record
	}

	delete(table, id) {
		// Delete a record from the database
	}

};
