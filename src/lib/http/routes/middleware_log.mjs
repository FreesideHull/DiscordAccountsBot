"use strict";

import pretty_ms from 'pretty-ms';

import log from '../../io/NamespacedLog.mjs'; const l = log("http:request");

async function middleware_log_request(ctx, next) {
	let start = new Date();
	
	await next();
	
	l.info(`[${pretty_ms(new Date() - start)}] [${ctx.request.method} ${ctx.response.statusCode}] ${ctx.request.connection.remoteAddress} -> ${ctx.request.url}`);
}

export default middleware_log_request;
