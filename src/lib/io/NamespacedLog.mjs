"use strict";

import a from './Ansi.mjs';
import l from './Log.mjs';

/**
 * Hashes a string to a numerical value.
 * NOT CRYPTOGRAPHICALLY SECURE!
 * @param	{string}	str		The string to hash.
 * @return	{number}	The resulting hashed value as a number.
 */
function hash_numeric(str) {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) - hash) + str.charCodeAt(i);
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

class NamespacedLog {
	constructor(namespace) {
		this.namespace = namespace;
		
		// From https://github.com/debug-js/debug/blob/master/src/node.js#L35
		let colours = [
			20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62,
			63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112,
			113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165,
			166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196,
			197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209,
			214, 215, 220, 221
		];
		this.nscolour = colours[Math.abs(hash_numeric(this.namespace)) % colours.length];
		let colouransi = `\u001b[3${(this.nscolour < 8 ? this.nscolour : '8;5;' + this.nscolour)}m`;
		if(!a.enabled) colouransi = "";
		this.ns = `${colouransi}${this.namespace}${a.reset}`;
	}
	
	debug(...msg)	{ l.debug(this.ns, ...msg); }
	info(...msg)	{ l.info(this.ns, ...msg); }
	log(...msg)		{ l.log(this.ns, ...msg); }
	warn(...msg)	{ l.warn(this.ns, ...msg); }
	error(...msg)	{ l.error(this.ns, ...msg); }
}

export default function(namespace) {
	return new NamespacedLog(namespace);
};
