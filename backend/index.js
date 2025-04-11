const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobs');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/jobs', jobRoutes);

mongoose.connect('your-mongodb-connection-string').then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
});