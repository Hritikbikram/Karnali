const mongoose =require("mongoose")

const AboutPageSchema=new mongoose.Schema({
  abttitle:String,
  abtdescription:String,
  abtimage:String
})

const about= mongoose.model('about',AboutPageSchema);

module.exports=about;