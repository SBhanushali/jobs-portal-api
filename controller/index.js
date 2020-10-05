// Import jobs model
const Jobs = require("../model/jobs");

// Handle Job creation request
/**
 * @api {post} /api/job Create job
 * @apiName Create new job
 *
 * @apiParam  {String} [companyName] company name
 * @apiParam  {String} [jobTitle] jobTitle
 * @apiParam  {String} [jobDescription] job description
 * @apiParam  {[String]} [skills] skills
 * @apiParam  {Object} [location] job location
 *
 * @apiSuccess (201) Job created
 */
exports.createJob = (req, res) => {
  const { companyName, jobTitle, jobDescription, skills, location } = req.body;
  if (
    companyName &&
    jobTitle &&
    jobDescription &&
    skills &&
    skills.length <= 10 &&
    location
  ) {
    const jobs = new Jobs();
    jobs.companyName = companyName;
    jobs.jobTitle = jobTitle;
    jobs.jobDescription = jobDescription;
    jobs.skills = skills;
    jobs.location = location;
    jobs
      .save()
      .then(() => {
        res.status(201).json({
          success: true,
          message: "Question created",
        });
      })
      .catch(() => {
        res.status(403).json({
          success: false,
          data: "Module name should be unique",
        });
      });
  } else {
    res.status(404).json({
      success: false,
      data: "Error some fields missing",
    });
  }
};
