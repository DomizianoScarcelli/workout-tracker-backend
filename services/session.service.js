const Session = require("../models/session.model")
const moment = require("moment")
const { daysBetweenInterval, weeksBetweenInterval, monthsBetweenInterval } = require("../utils/DateTimeUtils")
const { getOverallTime, getExerciseIndexIfExists } = require("../utils/SessionsUtils")

exports.findSessions = async (query) => {
	return Session.find(query)
}

exports.getUserSessionsByPeriod = async (username, startDate, endDate, page) => {
	const ELEMENTS_PER_PAGE = 15
	const sessions = await Session.find({ user: username, date: { $gte: startDate.toDate(), $lte: endDate.toDate() } })
	sessions.sort((workout1, workout2) => {
		if (moment(workout1.date) < moment(workout2.date)) {
			return 1
		}
		if (moment(workout1.date) > moment(workout2.date)) {
			return -1
		}
		return 0
	})
	return sessions.slice((page - 1) * ELEMENTS_PER_PAGE, page * ELEMENTS_PER_PAGE)
}

exports.createSession = async (date, exercises, duration, user) => {
	const session = new Session({ exercises, duration, user, date })
	return session.save()
}

exports.addExerciseToSession = async (name, id, repetition) => {
	return Session.updateOne(
		{ _id: id },
		{
			$push: {
				exercises: {
					name: name,
					repetition: repetition,
				},
			},
		}
	)
}

exports.getWorkoutTime = async (username, startDate, endDate, period) => {
	let result = []

	switch (period) {
		case "isoWeek":
			const daysBetween = daysBetweenInterval(startDate, endDate)
			for (const day of daysBetween) {
				const sessions = await Session.find({ user: username, date: { $gte: day.startOf("day").toDate(), $lte: day.endOf("day").toDate() } })
				result.push({ date: day, duration: getOverallTime(sessions) })
			}
			break
		case "month":
			//TODO: query the database for the correct sessions
			const weeksBetween = weeksBetweenInterval(startDate, endDate)
			for (const week of weeksBetween) {
				const sessions = await Session.find({ user: username, date: { $gte: week[0].toDate(), $lte: week[1].toDate() } })
				result.push({ date: week, duration: getOverallTime(sessions) })
			}
			break
		case "year":
			//TODO: query the database for the correct sessions
			const monthsBetween = monthsBetweenInterval(startDate, endDate)
			for (const month of monthsBetween) {
				const sessions = await Session.find({ user: username, date: { $gte: month[0].toDate(), $lte: month[1].toDate() } })

				result.push({ date: month, duration: getOverallTime(sessions) })
			}
			break
		default:
			break
	}
	return result
}

//TODO: find a more efficient way of solving this problem
//TODO: it sometimes return duplicated names
exports.getUserMostFrequentExercises = async (username, startTime, endTime) => {
	const daysBetween = daysBetweenInterval(startTime, endTime)
	let result = []
	for (let day of daysBetween) {
		const sessions = await Session.find({ user: username, exercises: { $ne: [] }, date: { $gte: day.startOf("day").toDate(), $lte: day.endOf("day").toDate() } })
		for (let workout of sessions) {
			if (workout.exercises == undefined) return
			for (let exercise of workout.exercises) {
				if (!getExerciseIndexIfExists(result, exercise.name)) {
					result.push({ name: exercise.name, repetition: exercise.repetition.reduce((partialSum, a) => partialSum + a, 0) })
				} else {
					result[getExerciseIndexIfExists(result, exercise.name)].repetition += exercise.repetition.reduce((partialSum, a) => partialSum + a, 0)
				}
			}
		}
	}
	result
		.sort((a, b) => {
			if (a.repetition > b.repetition) return 1
			if (a.repetition < b.repetition) return -1
			return 0
		})
		.reverse()
	return result
}

exports.removeWorkoutFromHistory = async (username, workoutId) => {
	const workout = await Session.deleteOne({ _id: workoutId, user: username })
	return workout
}
