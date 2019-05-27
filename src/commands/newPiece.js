const fs = require('fs-nextra');
const { window, workspace } = require('vscode');
const { resolve, basename } = require('path');

const { Command, eventStore } = require('../lib');

module.exports = class extends Command {

	constructor(...args) {
		super(...args);
		this.language = workspace.getConfiguration('klasa').get('language');
	}

	async run(mainDir, baseDir) {
		const pieceType = await window.showQuickPick(this.pieceTypes, { placeHolder: 'Select piece type:' });
		if (!pieceType) throw undefined;

		let piecePath = [baseDir, `${pieceType.toLowerCase()}s`];
		if (pieceType === 'Event') return this.event(piecePath);
		if (pieceType === 'Command') piecePath = await this.command(piecePath);

		const pieceName = await this.getName(pieceType);

		return this.createFile(resolve(...piecePath, `${pieceName}`), this.language, pieceType.toLowerCase());
	}

	async event(piecePath) {
		const event = await window.showQuickPick(eventStore, { placeHolder: 'Select event', ignoreFocusOut: true, matchOnDescription: true });
		if (!event) throw 'Aborted event creation';

		return this.createFile(resolve(...piecePath, `${event.label}`), this.language, 'event', event);
	}

	async command(piecePath) {
		const category = await this.getCategory(piecePath);
		if (category) {
			piecePath.push(category);
			const subCategory = await this.getCategory(piecePath);
			if (subCategory) piecePath.push(subCategory);
		}
		return piecePath;
	}

	async getCategory(piecePath) {
		const category = piecePath.length === 2 ? 'Category' : 'Sub-Category';
		const paths = await fs.scan(resolve(...piecePath), { filter: stats => stats.isDirectory() }).catch(() => new Map());
		const items = [...paths.keys()].map(absPath => ({ label: basename(absPath) }));

		items.push(
			{ label: `Create a new ${category}`, description: `Create a new command ${category} (aka folder)` },
			{ label: 'None', description: `Do not put in a ${category}` }
		);

		let { label: folderName } = await window.showQuickPick(items, {
			placeHolder: `Choose command ${category}`,
			ignoreFocusOut: true
		});

		if (!folderName) throw 'Aborted command creation';
		if (folderName === 'None') return null;
		if (folderName === `Create a new ${category}`) {
			folderName = await window.showInputBox({
				prompt: `Enter ${category} name`,
				placeHolder: `${category} name`,
				ignoreFocusOut: true
			});
			if (!folderName) throw 'Aborted command creation';
		}
		return folderName;
	}

	async getName(pieceType) {
		const pieceName = await window.showInputBox({
			prompt: `Enter the name of the ${pieceType}`,
			placeHolder: 'Name'
		});
		if (!pieceName) throw `Aborted ${pieceType} creation`;
		return pieceName;
	}

};
