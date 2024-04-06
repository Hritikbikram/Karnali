module.exports.blogChecks=(req,res,next)=>{
  const path = require("path");
  const fs =require("fs");

  try{
    if(req.files)
    {
      const {blogimage}=req.files;
      const imageExtension=path.extname(blogimage.name);
      const extension=[".png",".jpg",".jpeg"];
      if(extension.includes(imageExtension)){
        blogimage.mv(`./uploads/blogimg/${blogimage.name}`);
        req.CImage=`/uploads/blogimg/${blogimage.name}`;
        return next();
      }
      else{
        return res
        .status(400)
        .json({status:"error", message:"Unspported Image Format"})
      }
    }
    else
    {
      return res
      .status(400)
      .json({status:"error", message:"Please Add Image"})
    }


  }
  catch(e){
    return res.status(400).json({status:"error", message:`${e}`})
  }


}