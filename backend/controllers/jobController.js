const Job = require("../models/Job");

exports.addJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: "Failed to create job" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: "Failed to update status" });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete job" });
  }
};
