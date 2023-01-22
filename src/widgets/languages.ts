const statsObj = {};
let totalBytes = 0; //Total bytes of all langs used

function handleEvent(repoStats) {
	for (const lang in repoStats) {
		totalBytes += repoStats[lang];

		if (statsObj[lang] === undefined) {
			statsObj[lang] = repoStats[lang];
		} else {
			statsObj[lang] += repoStats[lang];
		}
	}
}

export default function languageWidget(stats) {
	const statsData = [];
	let longestLangWordLength = 0;

	stats.forEach(handleEvent);

	for (const lang in statsObj) {
		statsData.push([lang, (statsObj[lang] / totalBytes) * 70]);
	}

	return statsData
		.map((el) => {
			if (el[0].length > longestLangWordLength) {
				longestLangWordLength = el[0].length;
			}

			return [el[0], el[1]];
		}) //Find longest word
		.sort((a, b) => b[1] - a[1]) //Sort from highest to lowest
		.map((el) => [el[0], Math.ceil(el[1])]) //Round numbers
		.map(
			(el) =>
				`${
					el[0] + " ".repeat(longestLangWordLength + 1 - el[0].length)
				}0% ${"=".repeat(el[1]) + " ".repeat(70 - el[1])} 100%`
		) //Setup new array with the formated string
		.join("\n");
}
