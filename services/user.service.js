const User = require("../models/user.model")

exports.findUsers = async (query) => {
	return User.find(query)
}

exports.addUser = async (username, password, email) => {
	const savedWorkouts = []
	const user = new User({ username, password, email, savedWorkouts })
	return user.save()
}

exports.addSavedWorkout = async (username, name, exercises, duration) => {
	return User.updateOne(
		{ username: username },
		{
			$push: {
				savedWorkouts: {
					name: name,
					exercises: exercises,
					duration: duration,
				},
			},
		}
	)
}

exports.removeSavedWorkout = async (username, workoutId) => {
	//TODO: executing query twice error
	const workout = await User.updateOne({ username: username }, { $pull: { savedWorkouts: { _id: workoutId } } })
	return workout
}
