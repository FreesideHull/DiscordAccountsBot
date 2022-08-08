"use strict";

import path from 'path';
import child_process from 'child_process';


function run_child_process(command, args) {
	return new Promise((resolve, reject) => {
		const executing_child_process = child_process.exec(command, args, (error, stdout, stderr) => {
			if(error) reject(error);
			resolve(stdout, stderr);
		});
	});
}