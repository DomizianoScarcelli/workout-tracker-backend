const SessionService = require("../services/session.service")
const moment = require("moment")

exports.getSessions = async (req, res) => {
	const id = req.query.id
	if (id != null) {
		const sessions = await SessionService.findSessions({ _id: id })
		res.json(sessions)
	} else {
		const sessions = await SessionService.findSessions()
		res.json(sessions)
	}
}

exports.getUserSessions = async (req, res) => {
	const sessions = await SessionService.findSessionsSortedByDate({ user: req.params.username })
	res.json(sessions)
}

exports.getUserSessionsByPeriod = async (req, res) => {
	const username = req.params.username
	const startDate = moment(req.query.startDate)
	const endDate = moment(req.query.endDate)
	try {
		const sessions = await SessionService.getUserSessionsByPeriod(username, startDate, endDate)
		res.json(sessions)
	} catch (err) {
		res.json("Error: " + err.message)
	}
}

exports.createSession = async (req, res) => {
	const duration = req.body.duration
	const user = req.body.user
	const date = req.body.date
	let exercises = []
	if (exercises != undefined) {
		exercises = req.body.exercises
	}
	try {
		const session = await SessionService.createSession(date, exercises, duration, user)
		res.json(`Session added with the following info:
		exercises: ${exercises},
		duration: ${duration},
		user: ${user},
		date: ${date}`)
	} catch (err) {
		res.json("Error: " + err.message)
	}
}

exports.addExerciseToSession = async (req, res) => {
	const name = req.body.name
	const id = mongoose.Types.ObjectId(req.params.session)
	const repetition = req.body.repetition
	try {
		const session = SessionService.addExerciseToSession(name, id, repetition)
		res.json("Exercises added")
	} catch (err) {
		res.json("Error: " + err.message)
	}
}

exports.getWorkoutTimeDay = async (req, res) => {
	const username = req.params.username
	const day = moment(req.query.day)
	try {
		const workoutTime = await SessionService.getWorkoutTime(username, day, day)
		res.json(workoutTime)
	} catch (err) {
		res.json("Error: " + err.message)
	}
}

exports.getWorkoutTimeInterval = async (req, res) => {
	const username = req.params.username
	const startTime = moment(req.query.startTime)
	const endTime = moment(req.query.endTime)
	try {
		const workoutTime = await SessionService.getWorkoutTime(username, startTime, endTime)
		res.json(workoutTime)
	} catch (err) {
		res.json("Error: " + err.message)
	}
}

exports.getUserMostFrequentExercises = async (req, res) => {
	const username = req.params.username
	const startTime = moment(req.query.startTime)
	const endTime = moment(req.query.endTime)
	try {
		const exercises = await SessionService.getUserMostFrequentExercises(username, startTime, endTime)
		res.json(exercises)
	} catch (err) {
		res.json("Error: " + err.message)
	}
}

exports.removeWorkoutFromHistory = async (req, res) => {
	const username = req.query.username
	const workoutId = req.params.workoutId
	try {
		const exercises = await SessionService.removeWorkoutFromHistory(username, workoutId)
		res.json(exercises)
	} catch (err) {
		res.json("Error: " + err.message)
	}
}
