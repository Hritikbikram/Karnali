module.exports.updatetestimonialcheck=(req,res,next)=>{
  const path = require("path");
  const fs = require("fs");

  try{
    if(req.files)
    {
      const {testimonialimage}=req.files;
      const imageExtension=path.extname(testimonialimage.name);
      const extension=[".png",".jpg",".jpeg"];
      if(extension.includes(imageExtension)){
        testimonialimage.mv(`./uploads/testimon/${testimonialimage.name}`);
        req.CImage=`/uploads/testimon/${testimonialimage.name}`;
        return next();
      }
      else{
        return res
        .status(400)
        .json({ status:"error", message:"Unspported Image Format "})

      }
    }
    else
    {
      return res
      .status(400)
      .json({status:"error", message:"Please add testimonials"})
    }
  }
  catch(e){
    return res.status(400).json({status:"error", message:`${e}`})
  }



}