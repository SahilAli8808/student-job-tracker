import express from 'express';
import Job from '../models/Job.js';

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

// Get all jobs
router.get('/', async (req, res) => {
  const { status, from, to } = req.query;
  let filter = {};
  if (status) filter.status = status;
  if (from && to) {
    filter.date = { $gte: new Date(from), $lte: new Date(to) };
  }

  const jobs = await Job.find(filter).sort({ date: -1 });
  res.json(jobs);
});

// Update status
router.put('/:id', async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

export default router;
