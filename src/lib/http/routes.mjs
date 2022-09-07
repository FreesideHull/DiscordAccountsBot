"use strict";

import ServerRouter from 'powahroot/Server.mjs';

import settings from '../../settings.mjs';
import SysadminInterface from '../sysadmin/SysadminInterface.mjs';

import middleware_log from './routes/middleware_log.mjs';
import middleware_catch_errors from './routes/middleware_errors.mjs';

import route_files from './routes/route_files.mjs';
import route_change_password from './routes/route_change_password.mjs';
import route_serve_change_password from './routes/route_serve_change_password.mjs';

/**
 * Creates a new router for HTTP requests.
 * @param	{SysadminInterface}	sysadmin_interface	The class that interfaces with the Freeside network and performs administrative actions.
 * @return	{ServerRouter}	The new serve router class instance.
 */
export default function(sysadmin_interface) {
	const router = new ServerRouter();
	
	router.on_all(middleware_catch_errors.bind(this, settings.cli.verbose));
	router.on_all(middleware_log);
	
	router.get("/static/::filepath", route_files);
	
	router.get("/actions/change-password", route_serve_change_password);
	router.post("/actions/change-password", route_change_password.bind(sysadmin_interface));
	// TODO: add routes here
	
	return router;
}