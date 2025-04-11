const express = require("express");
const router = express.Router();
const {
  addJob,
  getJobs,
  updateJobStatus,
  deleteJob,
} = require("../controllers/jobController");

router.post("/", addJob);
router.get("/", getJobs);
router.patch("/:id", updateJobStatus);
router.delete("/:id", deleteJob);

module.exports = router;
