const { searchParamsToQueryObj } = require("../helper");
// Import jobs model
const Jobs = require("../model/jobs");

// Handle Job creation request
/**
 * @api {post} /job Create job
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
          message: "Job created",
        });
      })
      .catch(() => {
        res.status(403).json({
          success: false,
          data: "Module name should be unique",
        });
      });
  } else {
    res.status(400).json({
      success: false,
      data: "Error some fields missing",
    });
  }
};

// Handle get jobs
/**
 * @api {get} /job?location=""&search-term="" Create job
 * @apiName Search for jobs
 *
 * @apiParam  {String} [location] location
 * @apiParam  {String} [search-term] skills search term
 *
 * @apiSuccess (200) Jobs found
 */

exports.searchJobs = (req, res) => {
  if (req.query.location && req.query["search-term"]?.split(",") <= 3) {
    const location = req.query.location;
    const queryObj = searchParamsToQueryObj(location);
    const searchTerm = req.query["search-term"].split(",");
    Jobs.aggregate([
      { $match: { queryObj } },
      { $match: { skills: { $in: searchTerm } } },
      {
        $project: {
          companyName: 1,
          jobTitle: 1,
          location: 1,
          jobDescription: 1,
          skills: 1,
          order: {
            $size: {
              $setIntersection: [searchTerm, $skills],
            },
          },
        },
      },
      { $sort: { order: -1 } },
    ])
      .then((docs) => {
        res.status(200).json({
          success: true,
          data: docs,
        });
      })
      .catch((err) => console.log(err));
  } else if (req.query.location) {
    const location = req.query.location;
    const queryObj = searchParamsToQueryObj(location);

    Jobs.find(queryObj)
      .then((docs) => {
        res.status(200).json({
          success: true,
          data: docs,
        });
      })
      .catch((err) => console.log(err));
  } else if (
    req.query["search-term"] !== "" &&
    req.query["search-term"].split(",").length <= 3
  ) {
    const searchTerm = req.query["search-term"].split(",");
    Jobs.aggregate([
      { $match: { skills: { $in: searchTerm } } },
      {
        $project: {
          companyName: 1,
          jobTitle: 1,
          location: 1,
          jobDescription: 1,
          skills: 1,
          order: {
            $size: {
              $setIntersection: [searchTerm, "$skills"],
            },
          },
        },
      },
      { $sort: { order: -1 } },
    ])
      .then((docs) => {
        res.status(200).json({
          success: true,
          data: docs,
        });
      })
      .catch((err) => console.log(err));
  } else {
    if (req.query["search-term"].split(",").length > 3) {
      res.status(400).json({
        success: false,
        data: "Skills keyword should be less than or equal to 3",
      });
    } else {
      res.status(400).json({
        success: false,
        data: "Fields empty",
      });
    }
  }
};
