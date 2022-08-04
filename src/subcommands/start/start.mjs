"use strict";

import settings from '../../settings.mjs';

import start_discord from '../../lib/discord/index.mjs';
import HttpServer from '../../lib/http/HttpServer.mjs';

export default async function() {
	///
	// 1: Parse CLI arguments
	///
	
	// Any additional CLI argument parsing goes here.
	
	const port = settings.cli.port;
	
	///
	// 2: Start the HTTP server
	///
	const http_server = new HttpServer();
	http_server.init(port);
	
	
	///
	// 3: Start the discord bot
	///
	
	start_discord();
}