const mongoose = require("mongoose")

const EnquriySchema=new mongoose.Schema({
  Name:String,
  Email:String,
  Mobile:String,
  AltMob:String,
  Institute:String,
  Course:String,
  Message:String
})

const enqiryinfo=mongoose.model('enqiryinfo',EnquriySchema);
module.exports=enqiryinfo;