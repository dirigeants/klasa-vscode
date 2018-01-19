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

		await this.createFile(resolve(baseDir, 'app.js'), 'entry file');

		terminal.show();
		terminal.sendText(`cd "${mainDir}"`);
		terminal.sendText('npm init -y');
		terminal.sendText(`npm i discordjs/discord.js ${repo}`);
	}

};
