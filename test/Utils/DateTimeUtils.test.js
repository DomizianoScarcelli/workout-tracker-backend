const daysBetweenInterval = require("../../utils/DateTimeUtils")
const moment = require("moment")

test("Return array of the days between a time interval", () => {
	const startDate = moment("2022-03-29")
	const endDate = moment("2022-04-05")
	const result = daysBetweenInterval(startDate, endDate)
	let formattedResult = []
	result.forEach((day) => formattedResult.push(day.format()))
	console.log(formattedResult)
	const expectedResult = [
		moment("2022-03-29").format(),
		moment("2022-03-30").format(),
		moment("2022-03-31").format(),
		moment("2022-04-01").format(),
		moment("2022-04-02").format(),
		moment("2022-04-03").format(),
		moment("2022-04-04").format(),
		moment("2022-04-05").format(),
	]
	console.log(expectedResult)
	expect(formattedResult).toStrictEqual(expectedResult)
})
