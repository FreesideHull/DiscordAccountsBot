"use strict";

import path from 'path';
import { globby } from "globby";
import { Client } from "discord.js";

import log from '../../io/NamespacedLog.mjs'; const l = log("discord:handler");

// HACK: Make sure __dirname is defined when using es6 modules. I forget where I found this - a PR with a source URL would be great :D --@sbrl
const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));


/**
 * @param {Client} client
 */
export default async function (client) {

	// Commands
	const commandFiles = await globby(path.resolve(__dirname, `../commands/**/*.mjs`));
	for(const value of commandFiles) {
		l.log(`LOAD:command ${value}`);
		const file = (await import(value)).default;
		const splitted = value.split("/"); // I recommend using path.dirname() and path.dirname() here
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			l.log(`REGISTER:command ${value}`);
			const properties = { directory, ...file };
			client.commands.set(file.name, properties);
		}
	}

	// Events
	const eventFiles = await globby(path.resolve(__dirname, `../events/*.mjs`));
	for(const filepath of eventFiles) {
		l.log(`LOAD:event ${filepath}`);
		(await import(filepath)).default(client);
	}

	// Slash Commands
	const slashCommands = await globby(path.resolve(__dirname, `../SlashCommands/**/*.mjs`));
	const arrayOfSlashCommands = [];

	for(const value of slashCommands) {
		l.log(`LOAD:slashcommand ${value}`);
		const file = (await import(value)).default;
		if (!file?.name) continue;
		client.slashCommands.set(file.name, file);

		if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	};
	
	client.on("ready", async () => {
		l.log(`ready!`)
		// Register for all the guilds the bot is in
		await client.application.commands.set(arrayOfSlashCommands);
	});
};
