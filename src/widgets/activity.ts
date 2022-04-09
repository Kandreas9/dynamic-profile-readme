const eventsObj = {
	ReleaseEvent(event) {
		return `✨ ${event.payload.release.tag_name} of ${event.repo.name} was ${event.payload.action}.`
	},
	ForkEvent(event) {
		return `🍴 Forked ${event.payload.full_name}.`
	},
	IssuesEvent(event) {
		return `🧨 An issue was ${event.payload.action} on ${event.repo.name}.`
	},
	PublicEvent(event) {
		return `🌈 The repo ${event.repo.name} was made public!!`
	},
	PushEvent(event) {
		return `🚀 Pushed ${
			event.payload.size > 1
				? `${event.payload.size} commits`
				: `${event.payload.size} commit`
		} to ${event.repo.name}`
	},
}

function handleEvent(event) {
	return eventsObj[event.type](event)
}

export default function activityWidget(events) {
	return events
		.filter((event) => event.type in eventsObj) //Filter unsupported events
		.slice(0, 10) //Limit to 10 events
		.map(handleEvent) //Parse event data
		.join('\n')
}
