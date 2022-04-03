const Session = require("../models/session.model")
const daysBetweenInterval = require("../utils/DateTimeUtils")
const { getOverallTime, getExerciseIndexIfExists } = require("../utils/SessionsUtils")

exports.findSessions = async (query) => {
	return Session.find(query)
}

exports.findSessionsSortedByDate = async (query) => {
	const sessions = await Session.find(query)
	sessions.sort()
	return sessions
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

exports.getWorkoutTime = async (username, startDate, endDate) => {
	let result = []
	const daysBetween = daysBetweenInterval(startDate, endDate)
	for (const day of daysBetween) {
		const sessions = await Session.find({ user: username, date: { $gte: day.startOf("day").toDate(), $lte: day.endOf("day").toDate() } })
		result.push({ date: day, duration: getOverallTime(sessions) })
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
					result.push({ name: exercise.name, repetition: exercise.repetition })
				} else {
					result[getExerciseIndexIfExists(result, exercise.name)].repetition += exercise.repetition //Questo coso da errore
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
