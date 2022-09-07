"use strict";

export default async function(context, _next) {
	// TODO: Serve the webpage that allows users to change their password here.... but ONLY if the token is correct.
	context.send.text(501, "Coming soon");
}