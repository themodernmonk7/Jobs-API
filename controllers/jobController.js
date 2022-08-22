const { StatusCodes } = require("http-status-codes")
const { BadRequestError, NotFoundError } = require("../errors")
const Job = require("../models/jobModel")

//* ========================= GET ALL JOBS ========================= */
const getAllJobs = async (req, res) => {
  // TODO: Sort on the basis of last created job
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt")
  res.status(StatusCodes.OK).json({ total_jobs: jobs.length, jobs })
}

//* ========================= GET SINGLE JOB ========================= */
const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

//* ========================= CREATE JOB ========================= */
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId

  // Extra validation
  const { company, position, status } = req.body
  if (!company || !position || !status) {
    throw new BadRequestError("Please provide all values")
  }

  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

//* ========================= UPDATE JOB ========================= */
const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty.")
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job with the id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

//* ========================= DELETE JOB ========================= */
const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findByIdAndRemove({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
}
