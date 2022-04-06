const mongoose = require("mongoose")

const user = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	savedWorkouts: [
		{
			name: {
				type: String,
				required: true,
			},
			exercises: {
				name: String,
				repetition: Number,
			},
			duration: {
				type: Number,
				required: true,
			},
		},
	],
})

const User = (module.exports = mongoose.model("User", user))
