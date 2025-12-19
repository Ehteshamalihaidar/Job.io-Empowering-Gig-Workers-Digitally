import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
  const job = await Job.create({
    ...req.body,
    createdBy: req.user._id
  });
  res.status(201).json(job);
};

// Get All Jobs
// Get All Jobs (WITH SEARCH, FILTER, SORT)
export const getJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  // base query (VERY IMPORTANT)
  let queryObject = { createdBy: req.user._id };

  // 🔍 search by position
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  // 📌 filter by status
  if (status && status !== "all") {
    queryObject.status = status;
  }

  // 💼 filter by job type
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  let result = Job.find(queryObject);

  // ↕️ sorting
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  if (sort === "a-z") {
    result = result.sort("position");
  }

  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const jobs = await result;
  res.status(200).json(jobs);
};
// Update Job Status (Apply / Reject)
export const updateJobStatus = async (req, res) => {
  const { status } = req.body;

  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    { status },
    { new: true }
  );

  res.status(200).json(job);
};


// Update Job
export const updateJob = async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(job);
};

// Delete Job
export const deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: "Job removed" });
};
