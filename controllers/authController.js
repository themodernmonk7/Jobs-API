const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnauthenticatedError } = require("../errors")

// Register User
const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = await user.createToken()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

// Login User

const login = async (req, res) => {
  res.send("login")
}

const login1 = async (req, res) => {
  // Get the email and password from the req.body
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password")
  }
  // Find the user in database
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials")
  }
  // Compare password
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials")
  }
  // Create a token
  const token = user.createJWT()
  // send a response
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name }, token, msg: "User Login success" })
}

module.exports = {
  register,
  login,
}
