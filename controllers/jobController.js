//* ========================= GET ALL JOBS ========================= */
const getAllJobs = async (req, res) => {
  res.send("Get all jobs")
}

//* ========================= GET SINGLE JOB ========================= */
const getSingleJob = async (req, res) => {
  res.send("Get single job")
}

//* ========================= CREATE JOB ========================= */
const createJob = async (req, res) => {
  res.send("Create job")
}

//* ========================= UPDATE JOB ========================= */
const updateJob = async (req, res) => {
  res.send("Update job")
}

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
