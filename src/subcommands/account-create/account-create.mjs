"use strict";

// import settings from '../../settings.mjs';

export default async function() {
	if(!process.env.ACCOUNT_USER)
		throw new Error(`Error: No username specified in the ACCOUNT_USER environment variable.`);
	if(!process.env.ACCOUNT_PASSWORD)
		throw new Error(`Error: No username specified in the ACCOUNT_PASSWORD environment variable.`);
	
	// TODO: parse from environment variables here for FreeIPA credentials, SSH key filepaths, etc. See also meta.mjs.
	
	const user = process.env.ACCOUNT_USER;
	const password = process.env.ACCOUNT_PASSWORD;
	
	throw new Error(`Not implemented yet (you specified user ${user} and password ${password})`);
}