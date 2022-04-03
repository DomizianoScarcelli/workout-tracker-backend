/**
 * Calculates the overall time (duration) of a list of a Session objects
 *
 * @param {*} sessions the Session object on which the overall time has to be calculated
 * @returns
 */
const getOverallTime = (sessions) => {
	duration = 0
	sessions.forEach((session) => {
		duration += session.duration
	})
	return duration
}

const getExerciseIndexIfExists = (exercises, name) => {
	for (let i = 0; i < exercises.length; i++) {
		if (exercises[i].name === name) return i
	}
	return false
}

module.exports = { getOverallTime, getExerciseIndexIfExists }
