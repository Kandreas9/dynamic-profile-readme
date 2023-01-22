import * as github from "@actions/github";
import * as fs from "fs";

import activityWidget from "src/widgets/activity";
import languageWidget from "src/widgets/languages";

export async function parseRegExWidget(source, USERNAME, GITHUB_TOKEN) {
	const octokit = github.getOctokit(GITHUB_TOKEN);

	const reggieActivity = /<!--GITHUB_ACTIVITY-->/g;
	const reggieLang = /<!--GITHUB_LANGUAGES-->/g;

	if (reggieActivity.test(source)) {
		const activity = await octokit.rest.activity.listPublicEventsForUser({
			username: USERNAME,
		});

		const activityData = activityWidget(activity.data);

		source = source.replaceAll(reggieActivity, activityData);
	}

	if (reggieLang.test(source)) {
		const repos = await octokit.rest.repos.listForUser({
			username: USERNAME,
		});

		const langStatsArray = [];

		for (let repo of repos.data) {
			const stats = await octokit.rest.repos.listLanguages({
				owner: USERNAME,
				repo: repo.name,
			});

			langStatsArray.push(stats.data);
		}

		const langData = languageWidget(langStatsArray);

		fs.writeFileSync("README.md", source.replaceAll(reggieLang, langData));
	}
}
