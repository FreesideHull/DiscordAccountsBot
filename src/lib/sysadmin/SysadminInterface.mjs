"use strict";

import path from 'path';

import run_child_process from '../io/run_child_process.mjs';

// HACK: Make sure __dirname is defined when using es6 modules. I forget where I found this - a PR with a source URL would be great :D
const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));


/**
 * Interface to the Freeside infrastructure.
 * In the future, it will be able to:
 * - Create accounts
 * - Enable/disable accounts
 * - Assign/remove groups to accounts
 * ...but currently it does nothing.
 */
class SysadminInterface {
	constructor() {
		
	}
	
	/**
	 * Installs 1 or more packages on the Freeside desktops.
	 * @param	{...string}	packages	One or more packages names.
	 * @return	{void}
	 */
	async install_packages_desktops(...packages) {
		const packages_clean = packages.map((package_name, i) => {
			if(typeof package_name !== "string")
				throw new Error(`Error: Expected package names to be of type string, but at index ${i} got value of type ${typeof package_name}.`);
			return package_name.replace(/[^0-9a-zA-Z_-]/g, "");
		});
		
		await run_child_process(
			"pyinfra", // Command name
			[ // Arguments
				path.join(__dirname, "pyinfra/dnf/desktops.py"),
				path.join(__dirname, "pyinfra/dnf/deploy-packages.py")
			],
			{ // Environment variables
				PYINFRA_PACKAGES: packages_clean.join(",")
			}
		)
	}
	
	/**
	 * Creates the home directory for a given user.
	 * @param	{string}	username	The username to create the home directory for.
	 * @return	{void}
	 */
	async create_home_directory(username) {
		if(typeof username !== "string")
			throw new Error(`Error: Expected username to be of type string, but got value fo type ${typeof username}.`);
		const username_clean = username.replace(/[^a-z0-9_-]/g, "");
		
		await run_child_process(
			"pyinfra", // Command name
			[ // Arguments
				path.join(__dirname, "pyinfra/accounts/storage.py"),
				path.join(__dirname, "pyinfra/accounts/verify-account.py")
			],
			{ // Environment variables
				PYINFRA_USERNAME: username_clean
			}
		)
	}
}

export default SysadminInterface;