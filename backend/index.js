require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const jobRoutes = require("./routes/jobRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
