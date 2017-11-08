const { resolve } = require('path');
const { workspace } = require('vscode');

const { Event } = require('../lib');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { emitter: workspace });
	}

	async run({ document: { fileName } }) {
		const fn = resolve(workspace.rootPath, 'package.json');
		if (fileName !== fn) return undefined;
		return delete require.cache[require.resolve(fn)];
	}

};
