// Get all jobs
const getAllJobs = async (req, res) => {
  res.send("Get all jobs")
}

// Get single job
const getSingleJob = async (req, res) => {
  res.send("Get single job")
}

// Create job
const createJob = async (req, res) => {
  res.send("Create job")
}

// Update job
const updateJob = async (req, res) => {
  res.send("Update job")
}

// Delete job
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
