const mongoose=require("mongoose")

const ClassSchema=new mongoose.Schema({
  ClassName:String,
  ClassDuration:String,
  ClassState:String,
  ClassDate:String,
  ClassImage:String
})

const CourseClass=mongoose.model('ClassCourse',ClassSchema);

module.exports=CourseClass;