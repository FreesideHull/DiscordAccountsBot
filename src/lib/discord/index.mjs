"use strict";

import { Client, Collection } from "discord.js";
import handler from './handler/index.mjs';

export default function () {
	const client = new Client({
		intents: 98819,
	});
	
	// Global Variables
	client.commands = new Collection();
	client.slashCommands = new Collection();
	
	// Initialize the project
	handler(client);
	
	client.on('ready', () => {
		console.log('FS Bot is online')
		client.user.setActivity(`Freeside Accounts`, { type: "WATCHING" })
	})
	
	
	client.login(process.env.DISCORD_TOKEN);
	return client;
}
