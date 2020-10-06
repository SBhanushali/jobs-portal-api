const { createJob, searchJobs } = require("../controller");

//Initialize express router
const router = require("express").Router();

// Set default API response
router.get("/", (req, res) => {
  res.json({
    status: "API working",
    message: "Welcome to Job Portal ",
  });
});

// Create job
router.post("/jobs", createJob);

// Search for job
router.get("/jobs", searchJobs);

module.exports = router;
