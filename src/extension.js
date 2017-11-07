const fs = require('fs-extra');
const { join } = require('path');
const { commands, Disposable } = require('vscode');

class Extension {

	static async activate(context) {
		const subscriptions = [];

		const cmds = await fs.readdir(join(__dirname, 'commands'));
		for (const cmdLoc of cmds) {
			const loc = join(__dirname, 'commands', cmdLoc);
			try {
				const command = new (require(loc))(context, loc);
				context.subscriptions.push(commands.registerCommand(command.name, command._run, command));
			} catch (err) {
				const error = err.message.endsWith('not a constructor') ? new TypeError(`Exported Structure Not A Class`) : err;
				console.error(`${error}: ${loc}`);
			}
		}
		const events = await fs.readdir(join(__dirname, 'events'));
		for (const eventLoc of events) {
			const loc = join(__dirname, 'events', eventLoc);
			try {
				const event = new (require(loc))(context, loc);
				event.emitter[event.name](event._run, event, subscriptions);
			} catch (err) {
				const error = err.message.endsWith('not a constructor') ? new TypeError(`Exported Structure Not A Class`) : err;
				console.error(`${error}: ${loc}`);
			}
		}

		this._disposable = Disposable.from(...subscriptions);
	}

	static deactivate() {
		// commands are already disposed because it's loaded in context.subscriptions...
		if (this._disposable) this._disposable.dispose();
	}

}

module.exports = Extension;
