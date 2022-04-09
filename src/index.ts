import * as core from '@actions/core'
import * as github from '@actions/github'
import * as fs from 'fs'

import activityWidget from './widgets/activity'

async function main() {
	try {
		const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
		const USERNAME = core.getInput('USERNAME')
		const TEMPLATE = core.getInput('TEMPLATE')
		const octokit = github.getOctokit(GITHUB_TOKEN)

		const activity = await octokit.rest.activity.listPublicEventsForUser({
			username: USERNAME,
		})

		const source = fs.readFileSync(__dirname + TEMPLATE, 'utf-8')
		const reggie = /<!--GITHUB_ACTIVITY-->/g
		// const matchList = []

		// for (let match of source.matchAll(reggie)) {
		// 	matchList.push(match)
		// }

		let activityData = activityWidget(activity.data)

		fs.writeFileSync('README.md', source.replaceAll(reggie, activityData))
	} catch (err) {
		core.error(err)
		process.exit(1)
	}
}

main()
