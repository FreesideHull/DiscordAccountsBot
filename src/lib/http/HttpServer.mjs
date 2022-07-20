"use strict";

import http from 'http';

import make_router from './routes.mjs';

import log from '../io/NamespacedLog.mjs'; const l = log("http");

/**
 * Manages the HTTP Server associated with the discord accounts bot.
 * It will serve pages to:
 * - Allow people to enter passwords
 * - other things I can't remember right now
 * ...but currently it does nothing.
 */
class HttpServer {
	constructor(port) {
		this.port = port;
		this.router = make_router();
	}
	
	init(port, address = '::1') {
		this.http = http.createServer(async (req, res) => {
			await this.router.handle(req, res);
		});
		
		const address_pretty = address.indexOf(`:`) > -1 ? `[${address}]` : address;
		this.http.listen(port, address, () => l.log(`Listening on http://${address_pretty}:${port}`));
	}
}

export default HttpServer;