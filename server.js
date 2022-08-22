require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const authenticateUser = require("./middleware/authentication")
// Routers
const authRoutes = require("./routes/authRoutes")
const jobRoutes = require("./routes/jobRoutes")
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
app.use(express.json())

app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
})

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/jobs", authenticateUser, jobRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const start = async() => {
    try {
        // connect db
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`🚀 Server is listening on ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()