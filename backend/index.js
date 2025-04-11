import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import jobRoutes from './routes/jobs.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobRoutes);

mongoose.connect(process.env.MONGO_URI, () => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
});
