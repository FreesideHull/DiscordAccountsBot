"use strict";

// Environment variable handling is done elsewhere --@sbrl
//require("dotenv").config();
// Unused? --@sbrl
//import discord from 'discord.js';

export default function(client) {
	client.on("messageCreate", async (message) => {
		if (
			message.author.bot ||
			!message.guild ||
			!message.content.toLowerCase().startsWith(process.env.PREFIX)
		)
			return;
	
		const [cmd, ...args] = message.content
			.slice(process.env.PREFIX.length)
			.trim()
			.split(/ +/g);
	
		const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
	
		if (!command) return;
		await command.run(client, message, args);
		
	});
}
