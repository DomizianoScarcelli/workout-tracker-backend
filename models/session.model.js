const mongoose = require("mongoose")

const session = mongoose.Schema({
	exercises: [{ name: String, repetition: Number }],
	duration: {
		type: Number,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	date: Date,
})

const Session = (module.exports = mongoose.model("Session", session))
