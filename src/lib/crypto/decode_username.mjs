"use strict";

import { decrypt } from './secretbox.mjs';

/**
 * Decodes an encoded username.
 * @param	{string}	key					The key to decode with.
 * @param	{string}	encoded_username	The encoded username.
 * @return	{string}	The decoded username.
 */
export default function(key, encoded_username) {
	if(typeof username !== "string") throw new Error(`Expected username to be a string`);
	
	const obj = decrypt(key, encoded_username.replace(/-/g, "+").replace(/_/g, "/"));
	if(obj === null
		|| obj.type !== "username"
		|| typeof obj.username !== "string")
			return null;
	
	return obj.username;
};