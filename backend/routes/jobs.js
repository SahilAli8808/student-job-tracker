const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

router.post('/', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.json(job);
});

router.patch('/:id', async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(job);
});

router.delete('/:id', async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
