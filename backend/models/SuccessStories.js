const mongoose=require("mongoose")

const SuccessSchema=new mongoose.Schema({
  SuccessName:String,
  SuccessJob:String,
  SuccessPlace:String,
  SuccessDate:String,
  SuccessImage:String,
})

const successstory=mongoose.model('successstory',SuccessSchema);

module.exports=successstory;