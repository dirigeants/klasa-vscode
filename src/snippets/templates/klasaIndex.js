const { Client } = require('klasa');

new Client({
	apiRequestMethod: '$1',
	fetchAllMembers: $2,
	prefix: '$3',
	cmdEditing: $4,
	cmdPrompt: $5,
	cmdLogging: $6,
	typing: $7,
	quotedStringSupport: $8,
	readyMessage: (client) => `${client.user.tag}, Ready to serve ${client.guilds.size} guilds and ${client.users.size} users`
}).login('$0');
