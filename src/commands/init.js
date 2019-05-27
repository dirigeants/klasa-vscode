const { window } = require('vscode');
const { resolve } = require('path');

const { Command } = require('../lib');

module.exports = class extends Command {

	async run(mainDir, baseDir) {
		const { label: repo } = await window.showQuickPick([
			{ label: 'klasa', description: 'From NPM Package' },
			{ label: 'dirigeants/klasa', description: 'From Github repository' }
		], { placeHolder: 'Select source:' });

		const { label: lang } = await window.showQuickPick([
			{ label: 'JavaScript', description: 'Use JavaScript for the bot' },
			{ label: 'TypeScript', description: 'Use TypeScript for the bot' }
		], { placeHolder: 'Select language:' });

		const { label: pkgManager } = await window.showQuickPick([
			{ label: 'npm', description: 'Use NPM to install packages' },
			{ label: 'yarn', description: 'Use yarn to install packages' }
		], { placeHolder: 'Select package manager:' });

		if (!repo || !lang || !pkgManager) throw undefined;

		const terminal = window.createTerminal('Klasa');

		const editor = await this.createFile(resolve(mainDir, '.gitignore'), 'ignore file');
		await editor.document.save();

		if (lang === 'JavaScript') {
			const editor2 = await this.createFile(resolve(baseDir, 'index.js'), 'entry file');
			await editor2.document.save();
			await this.createFile(resolve(baseDir, 'config.js'), 'config file');
		} else {
			const editor2 = await this.createFile(resolve(baseDir, 'index.ts'), 'entry file');
			await editor2.document.save();
			await this.createFile(resolve(baseDir, 'config.ts'), 'config file');
		}

		terminal.show();
		terminal.sendText(`cd "${mainDir}"`);
		terminal.sendText(pkgManager === 'npm' ? 'npm init -y' : 'yarn init -y');
		terminal.sendText(pkgManager === 'npm' ? `npm i discordjs/discord.js ${repo}` : `yarn add discordjs/discord.js ${repo}`);
	}

};
