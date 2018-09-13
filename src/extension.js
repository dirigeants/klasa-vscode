const fs = require('fs-nextra');
const { join } = require('path');
const { commands } = require('vscode');

class Extension {

	static async activate(context) {
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
	}

	static deactivate() {
		// commands are already disposed because it's loaded in context.subscriptions...
	}

}

module.exports = Extension;
