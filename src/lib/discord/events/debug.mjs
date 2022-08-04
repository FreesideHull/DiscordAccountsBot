"use strict";

import log from '../../io/NamespacedLog.mjs'; const l = log("discord:debug");

export default async function(client) {
	client.on('debug', l.debug.bind(l));
}