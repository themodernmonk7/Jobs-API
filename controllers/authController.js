const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const { BadRequestError, UnauthenticatedError } = require("../errors")

//* ========================= REGISTER USER ========================= */
const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = await user.createToken()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

//* ========================= LOGIN USER ========================= */
const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password")
  }
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
  const token = user.createToken()
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name }, token, msg: "User Login success" })
}

module.exports = {
  register,
  login,
}
