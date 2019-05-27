const { dirname, resolve, basename } = require('path');
const { workspace, SnippetString, window, Uri } = require('vscode');
const fs = require('fs-nextra');

const snippets = {
	js: require('../../build/snippets.json'),
	ts: require('../../build/snippets-ts.json')
};

class Command {

	constructor(context, location, options = {}) {
		this.context = context;
		this.location = location;
		this.name = `klasa.${options.name || basename(this.location, '.js')}`;
		this.pieceTypes = ['Command', 'Event', 'Extendable', 'Finalizer', 'Inhibitor', 'Language', 'Monitor', 'Provider', 'Task'];
	}


	async _run() {
		// get multi basedir/coredir
		let dirs;

		if (!workspace.workspaceFolders) return window.showErrorMessage('You must have a workspace opened.');

		if (workspace.workspaceFolders.length === 1) {
			dirs = this.constructor.getDirs(workspace.workspaceFolders[0]);
		} else {
			const workspaceFolder = await window.showWorkspaceFolderPick();
			if (!workspaceFolder) return window.showErrorMessage('Aborted');
			dirs = this.constructor.getDirs(workspaceFolder);
		}

		// common checks

		// run the command
		return this.run(...dirs).catch(err => {
			if (err === undefined) return false;
			if (typeof err === 'string') return window.showErrorMessage(err);
			return console.error(err);
		});
	}

	run() {
		// stub
	}

	async createFile(path, type, options) {
		if (await fs.pathExists(path)) throw `${path} already exists!`;
		await fs.createFile(path);
		const textDocument = await workspace.openTextDocument(Uri.file(path));
		const editor = await window.showTextDocument(textDocument);
		const fileType = path.endsWith('ts') ? 'ts' : 'js';
		await editor.insertSnippet(this.generateSnippet(type, fileType, options));
		return editor;
	}

	generateSnippet(type, lang, event) {
		let content = snippets[lang][`Create new Klasa ${type}`].body.join('\n');
		if (event) content = content.replace(/\.\.\.params/g, event.arguments || '');
		return new SnippetString(content);
	}

	static getDirs(workspaceFolder) {
		let baseDir;
		try {
			const { main } = require(resolve(workspaceFolder.uri.fsPath, 'package.json'));
			baseDir = resolve(workspaceFolder.uri.fsPath, dirname(main));
		} catch (err) {
			baseDir = resolve(workspaceFolder.uri.fsPath, 'src');
		}
		return [workspaceFolder.uri.fsPath, baseDir, resolve(workspaceFolder.uri.fsPath, 'node_modules', 'klasa', 'src')];
	}

}

module.exports = Command;
