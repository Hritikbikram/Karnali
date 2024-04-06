const mongoose=require("mongoose")

const TestimonialSchema=new mongoose.Schema({
  TestiName:String,
  TestiCourse:String,
  TestiDate:String,
  TestiMsg:String,
  TestiImage:String,
})

const testimonial=mongoose.model('testimonial',TestimonialSchema);

module.exports=testimonial;