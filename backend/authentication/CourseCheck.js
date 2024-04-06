module.exports.courscheck=(req,res,next)=>{
  const path = require("path");
  const fs= require("fs");


  try{
    if(req.files)
    {
      const {classcoimage}=req.files;
      const imageExtension=path.extname(classcoimage.name);
      const extension=[".png",".jpg",".jpeg"];
      if (extension.includes(imageExtension))
      {
        classcoimage.mv(`./uploads/courses/${classcoimage.name}`);
        req.CImage=`/uploads/courses/${classcoimage.name}`;
        return next();
      }
      else{
        return res
        .status(400)
        .json({status:"error", message:"Unsupported Image Format"})
      }
    }
    else{
      return res
      .status(400)
      .json({status:"error", message:"Please Add Course"})
    }
  }
  catch(e)
  {
    return res.status(400).json({status:"error",message:`${e}`})
  }


}