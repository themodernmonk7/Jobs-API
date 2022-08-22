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
const updateJob = async (req, res) => res.send("Update job")
//* ========================= DELETE JOB ========================= */
const deleteJob = async (req, res) => {
  res.send("Delete job")
}

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
}
