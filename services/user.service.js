const User = require("../models/user.model")

exports.findUsers = async (query) => {
	return User.find(query)
}

exports.addUser = async (username, password, email) => {
	const user = new User({ username, password, email })
	return user.save()
}
