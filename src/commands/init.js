const { window, workspace } = require('vscode');
const { resolve } = require('path');

const { Command } = require('../lib');

module.exports = class extends Command {

	async run(mainDir, baseDir) {
		const { label: repo } = await window.showQuickPick([
			{ label: 'klasa', description: 'From NPM Package' },
			{ label: 'dirigeants/klasa', description: 'From Github repository' }
		], { placeHolder: 'Select source:' });

		const lang = workspace.getConfiguration('klasa').get('language');
		const pkgManager = workspace.getConfiguration('klasa').get('packageManager');

		if (!repo) throw undefined;

		const terminal = window.createTerminal('Klasa');

		const editor = await this.createFile(resolve(mainDir, '.gitignore'), 'js', 'ignore file');
		const editor2 = await this.createFile(resolve(baseDir, 'index'), lang, 'entry file');
		await this.createFile(resolve(baseDir, 'config'), lang, 'config file');
		await editor.document.save();
		await editor2.document.save();

		terminal.show();
		terminal.sendText(`cd "${mainDir}"`);
		terminal.sendText(pkgManager === 'yarn' ? 'yarn init -y' : 'npm init -y');
		terminal.sendText(pkgManager === 'yarn' ? `yarn add discordjs/discord.js ${repo}` : `npm i discordjs/discord.js ${repo}`);
	}

};
