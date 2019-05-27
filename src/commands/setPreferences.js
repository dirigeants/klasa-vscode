const { workspace, window } = require('vscode');

const { Command } = require('../lib');

module.exports = class extends Command {

	async run() {
		const { label: language } = await window.showQuickPick([
			{ label: 'ts', description: 'Use TypeScript for Klasa bots' },
			{ label: 'js', description: 'Use JavaScript for Klasa bots' }
		], { placeHolder: 'Select language:' });

		const { label: pkgManager } = await window.showQuickPick([
			{ label: 'npm', description: 'Use NPM to install packages' },
			{ label: 'yarn', description: 'Use yarn to install packages' }
		], { placeHolder: 'Select package manager:' });

		workspace.getConfiguration('klasa').update('language', language);
		workspace.getConfiguration('klasa').update('packageManager', pkgManager);
	}

};
