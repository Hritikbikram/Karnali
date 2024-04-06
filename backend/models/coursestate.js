const mongoose = require("mongoose")

const coursestateSchema = new mongoose.Schema({
  title: String,
  body: String
});

const course = mongoose.model('course', coursestateSchema);

module.exports=course;