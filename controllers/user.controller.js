const UserService = require("../services/user.service")

exports.getUsers = async (req, res) => {
	const users = await UserService.findUsers({})
	res.json(users)
}

exports.getUserInfo = async (req, res) => {
	const username = req.params.username
	const userInfo = await UserService.findUsers({ username: username })
	res.json(userInfo)
}

exports.addUser = async (req, res) => {
	const username = req.body.username
	const password = req.body.password
	const email = req.body.email

	try {
		const user = await UserService.addUser(username, password, email)
		res.json(`User added with the following info: 
		username: ${username}
		passowrd: ${password}
		email: ${email}`)
	} catch (err) {
		res.status(400).json("Error: " + err.message)
	}
}

exports.addSavedWorkout = async (req, res) => {
	const username = req.params.username
	const name = req.body.name
	const exercises = req.body.exercises
	const duration = req.body.duration
	try {
		const savedWorkout = await UserService.addSavedWorkout(username, name, exercises, duration)
		res.json(`Added new workout to the user ${username} with the following info: 
		name: ${name}
		exercises: ${exercises}
		duration: ${duration}`)
	} catch (err) {
		res.status(400).json("Error: " + err.message)
	}
}

exports.removeSavedWorkout = async (req, res) => {
	const username = req.query.username
	const workoutId = req.params.workoutId
	try {
		const workout = await UserService.removeSavedWorkout(username, workoutId)
		res.json(workout)
	} catch (err) {
		res.json("Error: " + err.message)
	}
}
