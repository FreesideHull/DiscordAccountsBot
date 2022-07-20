"use strict";

export default function(cli) {
	cli.subcommand("start", "Starts the Discord accounts bot. Environment variables: [TODO INSERT HERE]")
		.argument("port", "The port to listen on for HTTP requests [default: 5912].", 5912, "integer");
	
	// TODO: Insert list of environment variables required into the above subcommand description.
}