const admission=require("../models/Admission")

const fetchadmission=async(req,res)=>{

  const AdmiState= await admission.find();
  res.json({admission:AdmiState})
}

//fetch by id
const admissionbyid=async(req,res)=>{

  //get id by url
  const admid=req.params.getid;

  //find Testinomials by Id
  const admimo=await admission.findById(admid)

  //respond
  res.json({admission:admimo})

}


//Create Testimonials
const createAdmission=async(req,res)=>{
  const{
    admissionname,
    admissiongender,
    admissionmail,
    admissionphone,
    admissionpeadd,
    admissionteadd,
    admissiondob,
    admissiongudnam,
    admissiongudco,
    admissionlev,
    admissionscl,
    admissionsub,
    admissionshift

  }=req.body;

  console.log(req.body)

  //Get Testimonial

  const wradmi= await admission.create({
    Adminame:admissionname,
    Admigend:admissiongender,
    Admimail:admissionmail,
    Adminum:admissionphone,
    Admipadd:admissionpeadd,
    Admitadd:admissionteadd,
    Admidate:admissiondob,
    Admiguan:admissiongudnam,
    Admiguap:admissiongudco,
    Admileve:admissionlev,
    Admischo:admissionscl,
    Admicour:admissionsub,
    Admishif:admissionshift,
    Admiimage:req.CImage,

  })

  //Response with new testimonial
  res.json({
    admission:wradmi
  })
}


module.exports={
  fetchAdmissionData:fetchadmission,
  fetchAdmissionDataById:admissionbyid,
  createAdmission
}