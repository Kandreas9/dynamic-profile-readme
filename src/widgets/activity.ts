const eventsObj = {
	ReleaseEvent(event) {
		return `✨ ${event.payload.tag_name} of ${event.repo.name} was ${event.payload.action}.`
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
	return events.slice(0, 10).map(handleEvent).join('\n')
}
