const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: String,
  date: String,
  link: String,
});

module.exports = mongoose.model('Job', JobSchema);