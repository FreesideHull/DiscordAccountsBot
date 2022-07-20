"use strict";

import { decrypt } from './secretbox.mjs';

/**
 * Decodes an encoded username.
 * @param	{string}	key					The key to decode with.
 * @param	{string}	encoded_username	The encoded username.
 * @param	{number}	expire_ms			Only return the username if the token is less than this many milliseconds old.
 * @return	{string}	The decoded username.
 */
export default function(key, encoded_username, expire_ms) {
	if(typeof username !== "string") throw new Error(`Expected username to be a string`);
	
	const obj = decrypt(key, encoded_username.replace(/-/g, "+").replace(/_/g, "/"));
	if(obj === null
		|| obj.type !== "username"
		|| typeof obj.username !== "string"
		|| typeof obj.now !== "string")
			return null;
	
	const time_generated = new Date(obj.now);
	
	if(new Date() - time_generated > expire_ms) return null;
	
	return obj.username;
};