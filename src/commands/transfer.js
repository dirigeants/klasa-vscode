const fs = require('fs-extra');
const { window } = require('vscode');
const { resolve } = require('path');

const { Command } = require('../lib');

module.exports = class extends Command {

	constructor(...args) {
		super(...args);
		this.pieceTypes = ['Command', 'Event', 'Extendable', 'Finalizer', 'Inhibitor', 'Language', 'Monitor', 'Provider'];
	}

	async run() {
		if (!this.coreDir) return window.showErrorMessage('You must have installed klasa.');

		const pieceType = await window.showQuickPick(this.pieceTypes, { placeHolder: 'Select piece type:' });
		if (!pieceType) throw undefined;

		const fromPath = await this.getPiece([this.coreDir, `${pieceType.toLowerCase()}s`]);
		const toPath = [this.baseDir, ...fromPath.slice(1)];

		return fs.copy(resolve(...fromPath), resolve(...toPath));
	}

	async getPiece(piecePath) {
		const items = (await fs.readdir(resolve(...piecePath)).catch(() => []))
			.map(label => ({ label }));

		const { label: piece } = await window.showQuickPick(items, {
			placeHolder: `Choose piece to transfer`,
			ignoreFocusOut: true
		});
		
		if (!piece) throw 'Aborted command transfer';
		piecePath.push(piece);
		if (fs.statSync(resolve(...piecePath)).isDirectory()) {
			return this.getPiece(piecePath);
		}
		return piecePath;
	}

};
