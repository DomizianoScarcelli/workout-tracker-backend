const moment = require("moment")
/**
 * Return an array that contains the days that are between the startDate and the endDate (both included)
 * @param startDate a moment.js object that represent the start of the time interval
 * @param endDate a moment.js object that represent the end of the time interval
 * @returns array containing the moment.js objects that represent the days between the interval
 */
exports.daysBetweenInterval = (startDate, endDate) => {
	const daysBetween = []
	const currentDay = startDate.clone()
	//Insert into daysBetween all the days that are between the startTime and endTime
	while (currentDay <= endDate) {
		daysBetween.push(currentDay.clone())
		currentDay.add(1, "day")
	}
	return daysBetween
}

exports.weeksBetweenInterval = (startDate, endDate) => {
	const weeksBetween = []
	const currentWeek = moment(startDate).startOf("month").clone()
	while (currentWeek <= endDate) {
		weeksBetween.push([currentWeek.startOf("isoWeek").clone(), currentWeek.endOf("isoWeek").clone()])
		currentWeek.add(1, "week")
	}
	return weeksBetween
}

exports.monthsBetweenInterval = (startDate, endDate) => {
	const monthsBetween = []
	const currentMonth = moment(startDate).startOf("year")
	while (currentMonth <= endDate) {
		monthsBetween.push([currentMonth.startOf("month").clone(), currentMonth.endOf("month").clone()])
		currentMonth.add(1, "month")
	}
	return monthsBetween
}
