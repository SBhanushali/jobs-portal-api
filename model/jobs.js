const mongoose = require("mongoose");

// Setup Schema
const jobsSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  location: {
    sublocality_level_1: { type: String },
    locality: { type: String },
    administrative_area_level_1: { type: String },
    administrative_area_level_2: { type: String },
    country: { type: String, required: true },
  },
  jobDescription: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Jobs = mongoose.model("Jobs", jobsSchema);
module.exports = Jobs;
