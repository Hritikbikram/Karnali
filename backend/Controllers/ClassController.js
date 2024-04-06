const classes=require("../models/Class")

const fetchClassCourse=async(req,res)=>{

  //findclass
  const classStates=await classes.find()
  res.json({ClassesCourses:classStates})
}

const fetchClassCoursebyId=async(req,res)=>{
  //get id by url
  const classid=req.params.getid;

  //find class by id
  const classCour=await classes.findById(classid)
  res.json({ClassesCourses:classCour})
}


const createClass=async(req,res)=>{

  const{
    classtitle,
    classtime,
    classst,
    classdat
  }=req.body;

  console.log(req.body)


  const wrClassCo= await classes.create({

    ClassName:classtitle,
    ClassDuration:classtime,
    ClassState:classst,
    ClassDate:classdat,
    ClassImage:req.CImage,


  })
res.json({
  ClassesCourses:wrClassCo
})



  
  // try{
    
  //   const result = await classes.findOne({ ClassName:classtitle
  //   });

  //   if (result) {
  //     return res
  //           .status(200)
  //           .json({ status: "fail", message: "Course Already exists" });
  //   }
  //   else{

      
        
    
    
  //     if (wrClassCo) {
  //       return res
  //         .status(201)
  //         .json({ status: "success", message: "Class Created" });
  //     } else {
  //       return res
  //         .status(400)
  //         .json({ status: "error", message: "Unable to create course" });
  //     }
    
      
    
  //   }
    
    
  //   }
  //   catch(e)
  //   {
  //     return res.status(400).json({ status: "error", message: `${e}` });
  //   }

}


const updateClasses=async(req,res)=>{
  
  const{
    classtitle,
    classtime,
    classst,
    classdat
  }=req.body;

  const id=req.params.id;
  console.log(id)
  

  try{
    const result=await classes.findOne({_id:id});

    if(result)
    {
      result.ClassName=classtitle || result.ClassName;
      result.ClassDuration=classtime || result.ClassDuration;
      result.ClassDate=classdat || result.ClassDate;
      result.ClassState=classst || result.ClassState;
      result.ClassImage=req.CImage || result.ClassImage;
      result.save();
      return res
      .status(200)
      .json({ status: "success", message: " Class Updated" });
      } else {
        return res
          .status(400)
          .json({ status: "error", message: "Unable to update" });
      }

  }
  catch(e)
  {
    return res.status(400).json({ status: "error", message: `${e}` });

  }

}


module.exports={
  gtclass:fetchClassCourse,
  gtclassid:fetchClassCoursebyId,
  ctclass:createClass,
  uptclass:updateClasses
}