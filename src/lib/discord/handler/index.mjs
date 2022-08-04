"use strict";

import path from 'path';
import { glob } from "glob";
import { promisify } from "util";
import { Client } from "discord.js";

const globPromise = promisify(glob);

// HACK: Make sure __dirname is defined when using es6 modules. I forget where I found this - a PR with a source URL would be great :D --@sbrl
const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));


/**
 * @param {Client} client
 */
export default async function (client) {
	// Commands
	const commandFiles = await globPromise(path.resolve(__dirname, `../commands/**/*.mjs`));
	for(const value of commandFiles) {
		const file = (await import(value)).default;
		const splitted = value.split("/"); // I recommend using path.dirname() and path.dirname() here
		const directory = splitted[splitted.length - 2];

		if (file.name) {
			const properties = { directory, ...file };
			client.commands.set(file.name, properties);
		}
	}

	// Events
	const eventFiles = await globPromise(path.resolve(__dirname, `../events/*.mjs`));
	for(const filepath of eventFiles) {
		(await import(filepath)).default(client);
	}

	// Slash Commands
	const slashCommands = await globPromise(
		path.resolve(__dirname, `../SlashCommands/*/*.js`)
	);

	const arrayOfSlashCommands = [];
	for(const value of slashCommands) {
		const file = (await import(value)).default;
		if (!file?.name) continue;
		client.slashCommands.set(file.name, file);

		if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
		arrayOfSlashCommands.push(file);
	};
	
	client.on("ready", async () => {
		// Register for all the guilds the bot is in
		await client.application.commands.set(arrayOfSlashCommands);
	});
};
