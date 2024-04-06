const mongoose=require("mongoose")

const contactSchema=new mongoose.Schema({
  ContactName:String,
  ContactEmail:String,
  ContactNumber:String,
  ContactSubject:String,
  ContactMessage:String
})

const contactInfos=mongoose.model('ContactDet',contactSchema);

module.exports=contactInfos;