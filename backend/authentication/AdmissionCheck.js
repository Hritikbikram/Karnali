module.exports.admisscheck=(req,res,next)=>{

  const path=require("path");
  const fs=require("fs");

  try{
    if(req.files)
    {
      const {admissionimage}=req.files;
      const imageExtension=path.extname(admissionimage.name);
      const extension=[".png",".jpg",".jpeg"];

      if(extension.includes(imageExtension)){
        admissionimage.mv(`./uploads/admisimg/${admissionimage.name}`);
        req.CImage=`/uploads/admisimg/${admissionimage.name}`;
        return next();
      }
      else
      {
        return res
        .status(400)
        .json({ status:"error", message:"Unspported Image Format "})
      }
    }
    else
    {
      return res
      .status(400)
      .json({status:"error", message:"Please add admission details"})
    }
  }
  catch(e){
    return res.status(400).json({status:"error", message:`${e}`})
  }
}