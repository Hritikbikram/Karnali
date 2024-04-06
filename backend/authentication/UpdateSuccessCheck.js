module.exports.UpdateSuccessChecks=(req,res,next)=>{
  const path = require("path");
  const fs= require("fs");

  try{
    if(req.files)
    {
      const {storyimage}=req.files;
      const imageExtension=path.extname(storyimage.name);
      const extension = [".png",".jpg",".jpeg"];
      if(extension.includes(imageExtension)){
        storyimage.mv(`./uploads/succpep/${storyimage.name}`);
        req.CImage=`/uploads/succpep/${storyimage.name}`;
        return next();
      }
      else
      {
        return res
        .status(400)
          .json({ status: "error", message: "Unspported Image Format" });
      }
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Please add the company logo" });
    }
  }
  catch (e) {
    return res.status(400).json({ status: "error", message: `${e}` });
  }
}