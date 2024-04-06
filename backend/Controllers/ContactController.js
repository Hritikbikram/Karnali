const contactdet=require("../models/ContactPage")

const fetchContact=async(req,res)=>{

  //alldetails

  const contactdetail=await contactdet.find();

  res.json({
    ContactDetails:contactdetail
  })

}

  const recordContact=async(req,res)=>{
    const{
      conname,
      conmail,
      conphone,
      consub,
      conmsg

    }=req.body;

    console.log(req.body)

    try{

      const wrcontact=await contactdet.create({
        ContactName:conname,
        ContactEmail:conmail,
        ContactNumber:conphone,
        ContactSubject:consub,
        ContactMessage:conmsg
      })
    

    if (wrcontact) {
      return res
        .status(201)
        .json({ status: "success", message: "Contact Created" });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Unable to create course" });
    }
    
    
    }
    catch(e)
    {
      return res.status(400).json({ status: "error", message: `${e}` });
    } 
  

}

module.exports={
  fetchContact,
  recordContact
}