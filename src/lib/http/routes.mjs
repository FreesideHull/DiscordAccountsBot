"use strict";

import ServerRouter from 'powahroot/Server.mjs';

import middleware_log from './routes/middleware_log.mjs';
import middleware_catch_errors from './routes/middleware_errors.mjs';

/**
 * Creates a new router for HTTP requests.
 * @return	{ServerRouter}	The new serve router class instance.
 */
export default function() {
	const router = new ServerRouter();
	
	router.on_all(middleware_catch_errors.bind(this, sys.config.verbose));
	router.on_all(middleware_log);
	
	// TODO: add routes here
	
	return router;
}