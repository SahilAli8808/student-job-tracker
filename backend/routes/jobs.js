const express = require('express');
const Job = require('../models/Job.js');

const router = express.Router();

// Create job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all jobs with optional filters
router.get('/', async (req, res) => {
  try {
    const { status, from, to } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (from && to) {
      filter.date = { $gte: new Date(from), $lte: new Date(to) };
    }
    const jobs = await Job.find(filter).sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update job
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete job
router.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
