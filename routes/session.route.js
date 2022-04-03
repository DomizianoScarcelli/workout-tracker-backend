const router = require("express").Router()
let Session = require("../models/session.model")
const mongoose = require("mongoose")
const moment = require("moment")

const SessionController = require("../controllers/session.controller")

/**
 * Gets all the sessions in the DB
 * The sessions can be filtered by id inside the query
 */
router.route("/").get(SessionController.getSessions)

/**
 * Gets all the session of a certain user
 */
router.route("/:username").get(SessionController.getUserSessions)

/**
 * Creates a new session
 * Body requires a "duration" field
 */
router.route("/create").post(SessionController.createSession)

/**
 * Push a new exercise inside a session
 * Body requires the name of the exercise and the repetition
 */
router.route("/addexercise/:session").post(SessionController.addExerciseToSession) //TODO: doesn't work

/**
 * Gets all the user (specified inside the :username field) sessions of the current week
 */
router.route("/:username/weekly-workouts").get(SessionController.getWeekSessions)

/**
 * Gets all the user (specified inside the :username field) sessions of the current month
 */
router.route("/:username/monthly-workouts").get(SessionController.getMonthSessions)

/**
 * Return the total minutes of workout that the user has done in the selected day
 * Query params are formatted as following: "YYYY-MM-DD"
 */
router.route("/:username/workout-time-day").get(SessionController.getWorkoutTimeDay)

/**
 * Return the total minutes of workout that the user has done in the selected time period
 * Query params are formatted as following: "YYYY-MM-DD"
 * The period inclued both the startTime and the endTime
 */
router.route("/:username/workout-time-period").get(SessionController.getWorkoutTimeInterval)

/**
 * Return the 10 most frequent exercises with their relative total repetition that the user
 * did in the inserted time period.
 *
 * Query params are formatted as following: "YYYY-MM-DD"
 * The period inclued both the startTime and the endTime
 *
 */
router.route("/:username/most-frequent-exercises").get(SessionController.getUserMostFrequentExercises)

module.exports = router
