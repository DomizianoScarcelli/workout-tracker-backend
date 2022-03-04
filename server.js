const mongoose = require("mongoose")
const cors = require("cors")
const express = require("express")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { family: 4, useNewUrlParser: true })
const connection = mongoose.connection
connection.once("open", () => {
	console.log("MongoDB database connection established successfully")
})

const usersRouter = require("./routes/users")
const sessionsRouter = require("./routes/sessions")

app.use("/sessions", sessionsRouter)
app.use("/users", usersRouter)

app.listen(port, () => {
	console.log("Listening on port: " + port)
})
