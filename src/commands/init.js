const { window, workspace } = require('vscode');
const { resolve } = require('path');

const { Command } = require('../lib');

module.exports = class extends Command {

	async run() {
		const { label: repo } = await window.showQuickPick([
			{ label: 'klasa', description: 'From NPM Package' },
			{ label: 'dirigeants/klasa', description: 'From Github repository' }
		], { placeHolder: 'Select source:' });

		if (!repo) throw undefined;
		const terminal = window.createTerminal('Klasa');

		terminal.show();
		terminal.sendText('npm init -y');
		terminal.sendText(`npm i ${repo}`);

		const entryFilePath = resolve(workspace.rootPath, 'app.js');
		return this.createFile(entryFilePath, 'entry file');
	}

};
