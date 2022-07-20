"use strict";

import pretty_ms from 'pretty-ms';

import log from '../../../../io/NamespacedLog.mjs'; const l = log("http:request");

/**
 * Handles errors thrown by handlers further down the chain. 
 * @param	{RequestContext}	context	The RequestContext object.
 * @param	{Function}			next	The function to call to invoke the next middleware item
 */
async function middleware_catch_errors(verbose, context, next) {
	try {
		await next();
	} catch(error) {
		handle_error(verbose, error, context);
	}
}

/**
 * Handles a given error thrown by a given RequestContext.
 * @param  {Error} error   The error that was thrown.
 * @param  {RequestContext} context The RequestContext from which the error was thrown.
 */
function handle_error(verbose, error, context) {
	l.info(`[?ms] [${context.request.method} 503] ${context.request.connection.remoteAddress} -> ${context.request.url}`);
	console.error(error.stack); // TODO: colourise this?
	// TODO: Send a better error page - perhaps with an error id that's uploaded to some remote system, or the prettified stack trace & offending code encrypted with a key?
	
	if(!verbose)
		context.send.plain(503, "Error caught", "Oops! An error ocurred. Please report this to bugs@starbeamrainbowlabs.com");
	else
		context.send.plain(503, `*** Server Error ***\n${error.stack}\n`);
	
}

export default middleware_catch_errors;
