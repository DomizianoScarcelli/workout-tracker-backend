const router = require("express").Router()

const UserController = require("../controllers/user.controller") //TODO:

router.route("/").get(UserController.getUsers)

router.route("/info/:username").get(UserController.getUserInfo)

router.route("/add").post(UserController.addUser)

module.exports = router
