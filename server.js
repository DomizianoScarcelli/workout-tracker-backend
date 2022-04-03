const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { family: 4, useNewUrlParser: true })
const connection = mongoose.connection
connection.once("open", () => {
	console.log("MongoDB database connection established successfully")
})

const usersRouter = require("./routes/user.route")
const sessionsRouter = require("./routes/session.route")

app.use("/sessions", sessionsRouter)
app.use("/users", usersRouter)

app.listen(port, () => {
	console.log("Listening on port: " + port)
})
