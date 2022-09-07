"use strict";

import path from 'path';
import fs from 'fs';

import mime from 'mime';

const __dirname = import.meta.url.slice(7, import.meta.url.lastIndexOf("/"));

const root_dir = path.resolve(__dirname, "../static");

function make_path_safe(path) {
	return path.replace(/[^a-zA-Z0-9\-\._\/]/g, "")
		.replace(/\.+/g, ".");
}

async function route_files(context, _next) {
	let safe_url = make_path_safe(context.params.filepath);
	let file_path = path.join(root_dir, safe_url);
	try {
		let info = await fs.promises.stat(file_path);
		if(info && info.isFile()) {
			context.response.writeHead(200, {
				"content-type": mime.getType(file_path),
				"content-length": info.size
			});
			fs.createReadStream(file_path)
				.pipe(context.response);
		}
		else {
			send_404(context, safe_url);
			return;
		}
	} catch(error) {
		if(error.code == "ENOENT") {
			send_404(context, safe_url);
			return;
		}
		else {
			throw error;
		}
	}
}

function send_404(context, url) {
	context.send.plain(404, `Error: ${url} couldn't be found.`);
}

export { route_files };
export default route_files;
