// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const fs = require('fs-extra');
const { resolve, join, dirname } = require('path');
const { window, commands, workspace, SnippetString, Uri } = require('vscode');

const pieceTypes = ['Command', 'Event', 'Extendable', 'Finalizer', 'Inhibitor', 'Language', 'Monitor', 'Provider'];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// eslint-disable-next-line func-names
exports.activate = async function (context) {
	const snippets = require('./snippets/klasa');
	const eventStorage = getEvents();

	const newPiece = commands.registerCommand('klasa.newPiece', async () => {
		if (!workspace.rootPath) return window.showErrorMessage('You must have a workspace opened.');

		const baseDir = getBaseDir();

		let pieceType = await window.showQuickPick(pieceTypes, { placeHolder: 'Select piece type:' });
		if (!pieceType) return false;
		pieceType = pieceType.toLowerCase();
		const pieceTypePlural = `${pieceType}s`;

		let piecePath = resolve(baseDir, pieceTypePlural);
		let pieceName;

		if (pieceType === 'command') {
			const items = await walkCommands(piecePath) || [];
			items.push(
				{ label: 'Create a new category', description: 'Create a new command category (aka folder)' },
				{ label: 'None', description: 'Do not put in a category' }
			);
			let { label: folderName } = await window.showQuickPick(items, {
				placeHolder: 'Choose command category',
				ignoreFocusOut: true
			});

			if (!folderName) return false;

			if (folderName !== 'None') {
				if (folderName === 'Create a new category') {
					folderName = await window.showInputBox({
						prompt: 'Enter Category name',
						placeHolder: 'Category name',
						ignoreFocusOut: true
					});
				}
				piecePath = join(piecePath, folderName);
			}
		}

		if (pieceType === 'event') {
			({ label: pieceName } = await window.showQuickPick(Object.keys(eventStorage.events).map(eventName => ({
				label: eventName,
				description: eventStorage.events[eventName].description
			})),
			{ placeHolder: 'Select event', ignoreFocusOut: true, matchOnDescription: true }));
		} else {
			pieceName = await window.showInputBox({
				prompt: `Enter the name of the ${pieceType}`,
				placeHolder: 'Name'
			});
		}

		piecePath = resolve(piecePath, `${pieceName}.js`);

		if (await fs.pathExists(piecePath)) {
			return window.showErrorMessage(`${piecePath} already exists!`);
		}

		await fs.ensureFile(piecePath);
		const textDocument = await workspace.openTextDocument(Uri.file(piecePath));
		const editor = await window.showTextDocument(textDocument);
		return editor.insertSnippet(generateSnippet(snippets, eventStorage, pieceType, pieceName));
	});

	const init = commands.registerCommand('klasa.init', async () => {
		const source = await window.showQuickPick([
			{ label: 'klasa', description: 'From NPM Package' },
			{ label: 'dirigeants/klasa', description: 'From Github repository' }
		], { placeHolder: 'Select source:' });

		if (!source) return;

		const { label: mainPath } = await window.showQuickPick([
			{ label: 'src/', description: 'Put the code in a subfolder' },
			{ label: './', description: 'Keep the code in the root folder' }
		], { placeHolder: 'Select sources folder:' });
		const terminal = window.createTerminal('Klasa');

		terminal.show();
		terminal.sendText('npm init -y');
		terminal.sendText(`npm i ${source.label}`);

		let entryFilePath = join(mainPath, 'klasa.js');
		entryFilePath = resolve(workspace.rootPath, entryFilePath);
		console.log(entryFilePath);
		if (!await fs.pathExists(entryFilePath)) {
			await fs.ensureFile(entryFilePath);
			const textDocument = await workspace.openTextDocument(Uri.file(entryFilePath));
			const editor = await window.showTextDocument(textDocument);
			editor.insertSnippet(generateSnippet(snippets, eventStorage, 'entry file'));
		}
	});

	context.subscriptions.push(newPiece);
	context.subscriptions.push(init);
};

// this method is called when your extension is deactivated
// eslint-disable-next-line func-names
exports.deactivate = function () {
	//
};

class EventStore {

	constructor() {
		this.events = [];
	}

	addEvent(name, eventArguments, description) {
		this.events[name] = { arguments: eventArguments, description };
		return this;
	}

}

const walkCommands = async (dir, subs = []) => {
	const files = await fs.readdir(join(dir, ...subs)).catch(() => { fs.ensureDir(dir); });
	if (!files) return [];
	return Promise.all(files
		.filter(file => fs.statSync(resolve(join(dir, ...subs), file)).isDirectory())
		.map(async file => (
			{ label: file, description: join('commands', file) }
		)));
};

const generateSnippet = (snippets, eventStorage, pieceType, name = '') => {
	let content = snippets[`Create new Klasa ${pieceType}`].body.join('\n').replace(/\${1:\${TM_FILENAME_BASE(:[^}]+)?}}/, name);
	if (pieceType === 'event') {
		content = content.replace(/\.\.\.params/g, eventStorage.events[name].arguments || '');
	}

	return new SnippetString(content);
};

const getEvents = () => new EventStore()
	.addEvent('channelCreate', 'channel', 'Emitted whenever a channel is created.')
	.addEvent('channelDelete', 'channel', 'Emitted whenever a channel is deleted.')
	.addEvent('channelPinsUpdate', 'channel, time', 'Emitted whenever the pins of a channel are updated.')
	.addEvent('channelUpdate', 'oldChannel, newChannel', 'Emitted whenever a channel is updated - e.g. name change, topic change.')
	.addEvent('clientUserGuildSettingsUpdate', 'clientUserGuildSettings', "Emitted whenever the client user's settings update.")
	.addEvent('clientUserSettingsUpdate', 'clientUserSettings', "Emitted whenever the client user's settings update.")
	.addEvent('commandError', 'message, command, params, error', 'Emitted when a command has errored.')
	.addEvent('commandInhibited', 'message, command, response', 'Emitted when a command has been inhibited.')
	.addEvent('commandRun', 'message, command, params, response', 'Emitted when a command has been run.')
	.addEvent('debug', 'info', 'Emitted for general debugging information.')
	.addEvent('disconnect', 'error', "Emitted when the client's WebSocket disconnects and will no longer attempt to reconnect.")
	.addEvent('emojiCreate', 'emoji', 'Emitted whenever a custom emoji is created in a guild.')
	.addEvent('emojiDelete', 'emoji', 'Emitted whenever a custom guild emoji is deleted.')
	.addEvent('emojiUpdate', 'oldEmoji, newEmoji', 'Emitted whenever a custom guild emoji is updated.')
	.addEvent('error', 'error', "Emitted whenever the client's WebSocket encounters a connection error.")
	.addEvent('guildBanAdd', 'guild, user', 'Emitted whenever a member is banned from a guild.')
	.addEvent('guildBanRemove', 'guild, user', 'Emitted whenever a member is unbanned from a guild.')
	.addEvent('guildCreate', 'guild', 'Emitted whenever the client joins a guild.')
	.addEvent('guildDelete', 'guild', 'Emitted whenever a guild is deleted/left.')
	.addEvent('guildMemberAdd', 'member', 'Emitted whenever a user joins a guild.')
	.addEvent('guildMemberAvailable', 'member', 'Emitted whenever a member becomes available in a large guild.')
	.addEvent('guildMemberRemove', 'member', 'Emitted whenever a member leaves a guild, or is kicked.')
	.addEvent('guildMembersChunk', 'members, guild', 'Emitted whenever a chunk of guild members is received. All members come from the same guild.')
	.addEvent('guildMemberSpeaking', 'member, speaking', 'Emitted once a guild member starts/stops speaking.')
	.addEvent('guildMemberUpdate', 'oldMember, newMember', 'Emitted whenever a guild member changes - i.e. new role, removed role, nickname.')
	.addEvent('guildUnavailable', 'guild', 'Emitted whenever a guild becomes unavailable, likely due to a server outage.')
	.addEvent('guildUpdate', 'oldGuild, newGuild', 'Emitted whenever a guild is updated - e.g. name change.')
	.addEvent('klasaReady', null, 'Emitted when klasa is fully ready and initialized.')
	.addEvent('log', 'data, type = \'log\'', 'A central logging event for klasa.')
	.addEvent('message', 'message', 'Emitted whenever a message is created.')
	.addEvent('messageDelete', 'message', 'Emitted whenever a message is deleted.')
	.addEvent('messageDeleteBulk', 'messages', 'Emitted whenever messages are deleted in bulk.')
	.addEvent('messageReactionAdd', 'messageReaction, user', 'Emitted whenever a reaction is added to a message.')
	.addEvent('messageReactionRemove', 'messageReaction, user', 'Emitted whenever a reaction is removed from a message.')
	.addEvent('messageReactionRemoveAll', 'message', 'Emitted whenever all reactions are removed from a message.')
	.addEvent('messageUpdate', 'oldMessage, newMessage', 'Emitted whenever a message is updated - e.g. embed or content change.')
	.addEvent('presenceUpdate', 'oldMember, newMember', "Emitted whenever a guild member's presence changes, or they change one of their details.")
	.addEvent('ready', null, 'Emitted when the client becomes ready to start working.')
	.addEvent('reconnecting', null, 'Emitted whenever the client tries to reconnect to the WebSocket.')
	.addEvent('resume', 'replayed', 'Emitted whenever a WebSocket resumes.')
	.addEvent('roleCreate', 'role', 'Emitted whenever a role is created.')
	.addEvent('roleDelete', 'role', 'Emitted whenever a guild role is deleted.')
	.addEvent('roleUpdate', 'oldRole, newRole', 'Emitted whenever a guild role is updated.')
	.addEvent('settingUpdate', 'gateway, id, oldEntries, newEntries', 'Emitted when SettingGateway.update, SettingGateway.updateArray or SettingGateway.reset is run.')
	.addEvent('typingStart', 'channel, user', 'Emitted whenever a user starts typing in a channel.')
	.addEvent('typingStop', 'channel, user', 'Emitted whenever a user stops typing in a channel.')
	.addEvent('userNoteUpdate', 'user, oldNote, newNote', 'Emitted whenever a note is updated.')
	.addEvent('userUpdate', 'oldUser, newUser', "Emitted whenever a user's details (e.g. username) are changed.")
	.addEvent('verbose', 'data', 'An event for handling verbose logs')
	.addEvent('voiceStateUpdate', 'oldMember, newMember', 'Emitted whenever a user changes voice state - e.g. joins/leaves a channel, mutes/unmutes.')
	.addEvent('warn', 'info', 'Emitted for general warnings.')
	.addEvent('wtf', 'data', 'An event for handling wtf logs (what a terrible failure)');

const getBaseDir = () => {
	try {
		const { main } = require(resolve(workspace.rootPath, 'package.json'));
		return join(workspace.rootPath, dirname(main));
	} catch (e) {
		return workspace.rootPath;
	}
};
