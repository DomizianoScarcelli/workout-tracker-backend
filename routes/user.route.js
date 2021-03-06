const router = require("express").Router()

const UserController = require("../controllers/user.controller")

router.route("/").get(UserController.getUsers)

router.route("/info/:username").get(UserController.getUserInfo)

router.route("/add").post(UserController.addUser)

router.route("/:username/saved-workouts/add").post(UserController.addSavedWorkout)

/**
 * Removes a workout
 */
router.route("/delete/:workoutId").delete(UserController.removeSavedWorkout)

module.exports = router
