"use strict";

import settings from '../../settings.mjs';

import DiscordBot from '../../lib/discord/DiscordBot.mjs';

export default async function() {
	// Any additional CLI argument parsing goes here.
	
	const port = settings.cli.port;
	
	// TODO: Start the HTTP server here.
	
	// TODO: Replace this example code we you see fit
	const bot = new DiscordBot();
	bot.start(); // This method does not exist yet
}