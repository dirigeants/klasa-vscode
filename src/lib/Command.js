const { join, dirname, resolve, basename } = require('path');
const { workspace, SnippetString, window, Uri } = require('vscode');
const fs = require('fs-extra');

const snippets = require('../snippets/klasa.json');

class Command {

	constructor(context, location, options = {}) {
		this.context = context;
		this.location = location;
		this.name = `klasa.${options.name || basename(this.location, '.js')}`;
		this._baseDir = null;
		this._coreDir = null;
	}

	get baseDir() {
		if (this._baseDir) return this._baseDir;
		try {
			const { main } = require(resolve(workspace.rootPath, 'package.json'));
			this._baseDir = join(workspace.rootPath, dirname(main));
		} catch (err) {
			this._baseDir = workspace.rootPath;
		}
		return this._baseDir;
	}

	get coreDir() {
		if (this._coreDir) return this._coreDir;
		try {
			const klasaDir = join(workspace.rootPath, 'node_modules', 'klasa');
			const { main } = require(resolve(klasaDir, 'package.json'));
			this._coreDir = join(klasaDir, dirname(main));
		} catch (err) {
			this._coreDir = null;
		}
		return this._coreDir;
	}

	_run() {
		// common checks
		if (!workspace.rootPath) return window.showErrorMessage('You must have a workspace opened.');

		return this.run().catch(err => {
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
		return editor.insertSnippet(this.generateSnippet(type, options));
	}

	generateSnippet(type, event) {
		let content = snippets[`Create new Klasa ${type}`].body.join('\n');
		if (event) content = content.replace(/\.\.\.params/g, event.arguments || '');
		return new SnippetString(content);
	}

}

module.exports = Command;
