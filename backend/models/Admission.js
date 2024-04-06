const mongoose=require("mongoose");

const AdmissionSchema=new mongoose.Schema({
  Adminame:String,
  Admigend:String,
  Admimail:String,
  Adminum:String,
  Admipadd:String,
  Admitadd:String,
  Admidate:String,
  Admiguan:String,
  Admiguap:String,
  Admileve:String,
  Admischo:String,
  Admicour:String,
  Admishif:String,
  Admiimage:String,
})

const admission=mongoose.model('admission',AdmissionSchema);

module.exports=admission;