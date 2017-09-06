// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { window, commands, workspace, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument, QuickPickItem } = require('vscode');


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// eslint-disable-next-line func-names
exports.activate = async function (context) {

	const init = commands.registerCommand('klasa.init', async () => {
		const items = [
			{ label: 'klasa', description: 'From NPM Package' },
			{ label: 'dirigeants/klasa', description: 'From Github repository' }
		];
		const source = await window.showQuickPick(items, { placeHolder: 'Select source:' });

		if (!source) return;
		const terminal = window.createTerminal('Klasa');

		terminal.show();
		terminal.sendText('npm init -y');
		terminal.sendText(`npm i ${source.label}`);
	});

	context.subscriptions.push(init);
};

// this method is called when your extension is deactivated
// eslint-disable-next-line func-names
exports.deactivate = function () {
};

