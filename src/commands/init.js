const { window } = require('vscode');
const { resolve } = require('path');

const { Command } = require('../lib');

module.exports = class extends Command {

	async run(mainDir, baseDir) {
		const { label: repo } = await window.showQuickPick([
			{ label: 'klasa', description: 'From NPM Package' },
			{ label: 'dirigeants/klasa', description: 'From Github repository' }
		], { placeHolder: 'Select source:' });

		if (!repo) throw undefined;
		const terminal = window.createTerminal('Klasa');

		const editor = await this.createFile(resolve(mainDir, '.gitignore'), 'ignore file');
		await editor.document.save();
		const editor2 = await this.createFile(resolve(baseDir, 'index.js'), 'entry file');
		await editor2.document.save();
		await this.createFile(resolve(baseDir, 'config.js'), 'config file');

		terminal.show();
		terminal.sendText(`cd "${mainDir}"`);
		terminal.sendText('npm init -y');
		terminal.sendText(`npm i -S discordjs/discord.js ${repo}`);
	}

};
