"use strict";

export default function(cli) {
	cli.subcommand("account-create", "Maintenance: Create a new user account. Environment variables: ACCOUNT_USER (the username), ACCOUNT_PASSWORD (the password)");
	// TODO: Add environment variable here for the FreeIPA credentials, SSH keys, etc
}
