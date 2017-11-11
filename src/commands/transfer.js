const fs = require('fs-extra');
const { window } = require('vscode');
const { resolve } = require('path');

const { Command } = require('../lib');

module.exports = class extends Command {

	async run(mainDir, baseDir, coreDir) {
		if (!await fs.pathExists(coreDir)) throw 'You must have installed klasa.';

		const pieceType = await window.showQuickPick(this.pieceTypes, { placeHolder: 'Select piece type:' });
		if (!pieceType) throw undefined;

		const fromPath = await this.getPiece([coreDir, `${pieceType.toLowerCase()}s`]);
		return fs.copy(resolve(...fromPath), resolve(baseDir, ...fromPath.slice(1)));
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
		return fs.statSync(resolve(...piecePath)).isDirectory() ?
			this.getPiece(piecePath) :
			piecePath;
	}

};
