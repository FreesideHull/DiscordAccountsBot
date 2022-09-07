"use strict";

import path from 'path';
import child_process from 'child_process';


function run_child_process(command, args, env_vars) {
	return new Promise((resolve, reject) => {
		const env = {};
		Object.assign(env, process.env);
		Object.assign(env, env_vars); // Environment variables specified by the caller take precedence
		
		const executing_child_process = child_process.exec(command, args, (error, stdout, stderr) => {
			if(error) reject(error);
			resolve(stdout, stderr);
		});
	});
}