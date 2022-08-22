require('dotenv').config()
require('express-async-errors')

// Extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const authenticateUser = require("./middleware/authentication")

// Routers
const authRoutes = require("./routes/authRoutes")
const jobRoutes = require("./routes/jobRoutes")

// Error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
})

// Routes
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