const mongoose=require("mongoose")

const CoursDetSchema= new mongoose.Schema({
  CourseName:String,
  CourseSkName:String,
  CourseDuration:String,
  ClassState:String,
  CareerAfter:String,
  CourseDetails:String,
  CourseBenefits:String,
  CourseContents:String
})

const CourseDetInfo=mongoose.model('Courseinfo',CoursDetSchema);
module.exports=CourseDetInfo;