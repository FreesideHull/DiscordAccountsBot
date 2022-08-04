"use strict";

import { Client, Collection } from "discord.js";
import handler from './handler/index.mjs';

// This will be done elsewhere
//import dotenv from "dotenv";
//dotenv.config();

export default function () {
	const client = new Client({
		intents: 98819,
	});
	module.exports = client;

	// Global Variables
	client.commands = new Collection();
	client.slashCommands = new Collection();

	// Initializing the project
	handler(client);

	client.on('ready', () => {
		console.log('FS Bot is online')
		client.user.setActivity(`Freeside Accounts`, { type: "WATCHING" })
	})


	client.login(process.env.DISCORD_TOKEN);
}
