const { workspace, window, Uri } = require('vscode');
const { resolve } = require('path');
const fetch = require('node-fetch');
const fs = require('fs-nextra');

const { Command } = require('../lib');

module.exports = class extends Command {

	async run(mainDir, baseDir) {
		const body = await fetch('https://api.github.com/repos/dirigeants/klasa-pieces/contents/providers').then(res => res.json());

		const { label: file } = await window.showQuickPick(
			body.map(fl => ({ label: fl.name, description: `Get the ${fl.name.slice(0, -3)} provider.` })),
			{ placeHolder: 'Install prebuilt provider:' });

		if (!file) throw undefined;

		const text = await fetch(`https://raw.githubusercontent.com/dirigeants/klasa-pieces/master/providers/${file}`).then(res => res.text());
		const path = resolve(baseDir, 'providers', file);

		if (await fs.pathExists(path)) throw `${path} already exists!`;
		await fs.outputFile(path, text);

		const textDocument = await workspace.openTextDocument(Uri.file(path));
		return window.showTextDocument(textDocument);
	}

};
