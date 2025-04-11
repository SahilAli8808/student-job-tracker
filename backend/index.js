const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jobRoutes = require('./routes/jobs.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobRoutes);

// Correct async mongoose connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    app.listen(5000, () => console.log('Server running on port 5000'));
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

startServer();
