const { workspace, window, Uri } = require('vscode');
const { resolve } = require('path');
const request = require('snekfetch');
const fs = require('fs-nextra');

const { Command } = require('../lib');

module.exports = class extends Command {

	async run(mainDir, baseDir) {
		const { body } = await request.get('https://api.github.com/repos/dirigeants/klasa-pieces/contents/providers');

		const { label: file } = await window.showQuickPick(
			body.map(fl => ({ label: fl.name, description: `Get the ${fl.name.slice(0, -3)} provider.` })),
			{ placeHolder: 'Install prebuilt provider:' });

		if (!file) throw undefined;

		const { body: text } = await request.get(`https://raw.githubusercontent.com/dirigeants/klasa-pieces/master/providers/${file}`);
		const path = resolve(baseDir, 'providers', file);

		if (await fs.pathExists(path)) throw `${path} already exists!`;
		await fs.outputFile(path, text);

		const textDocument = await workspace.openTextDocument(Uri.file(path));
		return window.showTextDocument(textDocument);
	}

};
