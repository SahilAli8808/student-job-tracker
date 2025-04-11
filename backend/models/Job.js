import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  company: String,
  role: String,
  status: {
    type: String,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  date: Date,
  link: String
});

export default mongoose.model('Job', JobSchema);
