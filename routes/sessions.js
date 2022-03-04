const router = require("express").Router()
let Session = require("../models/session.model")
var mongoose = require("mongoose")

/**
 * Gets all the sessions in the DB
 */
router.route("/").get((req, res) => {
	if (req.query.id != null) {
		Session.findById(req.query.id)
			.then((session) => res.json(session))
			.catch((err) => res.status(400).json("Error: " + err))
	} else {
		Session.find()
			.then((session) => res.json(session))
			.catch((err) => res.status(400).json("Error: " + err))
	}
})

/**
 * Creates a new session
 * Body requires a "duration" field
 */
router.route("/create").post((req, res) => {
	const duration = req.body.duration
	const user = req.body.user
	const date = new Date()
	const newSession = new Session({ duration, user, date })

	newSession
		.save()
		.then(() => res.json("Session added"))
		.catch((err) => res.status(400).json("Error: " + err))
})

/**
 * Push a new exercise inside a session
 * Body requires the name of the exercise and the repetition
 */
router.route("/addexercise/:session").post((req, res) => {
	const name = req.body.name
	const id = mongoose.Types.ObjectId(req.params.session)
	const repetition = req.body.repetition
	Session.updateOne(
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
		.then(() => res.json("Exercises added"))
		.catch((err) => res.status(400).json("Error: " + err))
})

/**
 * Gets all the session of a certain user
 */
router.route("/:username").get((req, res) => {
	Session.find({ user: req.params.username })
		.then((session) => res.json(session))
		.catch((err) => res.status(400).json("Error: " + err))
})

module.exports = router
