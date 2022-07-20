"use strict";

import { encrypt } from './secretbox.mjs';

/**
 * Encode a username into a token ready to be inserted into a URL.
 * @param	{string}	key			The key to encode the username with.
 * @param	{string}	username	The username to encode.
 * @return	{string}	The encoded value.
 */
export default function(key, username) {
	if(typeof username !== "string") throw new Error(`Expected username to be a string`);
	
	return encrypt(key, JSON.stringify({
		type: "username",
		username
	})).replace(/\+/g, "-").replace(/\//g, "_");
};