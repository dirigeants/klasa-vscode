const { basename } = require('path');
const { workspace, window } = require('vscode');

class Event {

	constructor(context, location, options = {}) {
		this.context = context;
		this.location = location;
		this.name = options.name || basename(this.location, '.js');
		this.emitter = options.emitter;
	}

	_run(...args) {
		// common checks
		if (!workspace.rootPath) return undefined;

		return this.run(...args).catch(err => {
			if (err === undefined) return false;
			if (typeof err === 'string') return window.showErrorMessage(err);
			return console.error(err);
		});
	}

	run() {
		// stub
	}

}

module.exports = Event;
