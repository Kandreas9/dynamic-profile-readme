import * as core from "@actions/core";
import * as fs from "fs";

import { parseRegExWidget } from "./helpers/parseRegEx";

async function main() {
	try {
		const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
		const USERNAME = core.getInput("USERNAME");
		const TEMPLATE = core.getInput("TEMPLATE");

		const source = fs.readFileSync(TEMPLATE, "utf-8");

		parseRegExWidget(source, USERNAME, GITHUB_TOKEN);
	} catch (err) {
		core.error(err);
		process.exit(1);
	}
}

main();
