const course=require("../models/coursestate")

const fetchstatus= async (req,res)=>{
  //Find CourseStatus
  const coursestate = await course.find()
  //Respond
  res.json({course:coursestate})

}


const fetchstatusbyid=async (req,res)=>{
  //get id by url
  const stateid=req.params.id;

  //find the coursestate by id
  const status=await course.findById(stateid) 

  //respond
  res.json({courstatus: status })
}

const recordstatus=async(req,res)=>{

  //GET DATA SENT
  // const title= req.body.title;
  // const body=req.body.body;

  const {
    coruseName,
    studentTotal,
  } = req.body;

  //GET Course State

  try{
    
    const result = await course.findOne({ title: coruseName });

    if (result) {
      return res
            .status(200)
            .json({ status: "fail", message: "Course Already exists" });
    }
    else{

      const courses = await course.create({
        title:coruseName,
        body:studentTotal,
      });
      
    
    
      if (courses) {
        return res
          .status(201)
          .json({ status: "success", message: "Course Created" });
      } else {
        return res
          .status(400)
          .json({ status: "error", message: "Unable to create course" });
      }
    
      
    
    }
    
    
    }
    catch(e)
    {
      return res.status(400).json({ status: "error", message: `${e}` });
    }






  //Respond with new course state
  // res.json({course:courses})

}

const updatestatusbyid=async (req,res)=>{
  //get id by url
  const statusid=req.params.id;

  //getdatabyreqbody

  const title=req.body.title;
  const numb=req.body.body;


  //find record to update
  const wstatus=await course.findByIdAndUpdate(statusid,{ 
    title:title,
    body:numb
  })

  //Updated Data

  const upstatus= await course.findById(statusid);

  //respond
  res.json({
    course:upstatus
  })
}

const deletestatusbyid=async(req,res)=>{
  //get id by url
  const deleteid=req.params.id;


  //Delete the data
  await course.deleteOne({_id: deleteid}) //Used "_id" just like written in the database table since writing only -> id didn't work  

  //respond

  res.json({
    success:"Record Deleted"
  })
}


module.exports={
  fetchStatus:fetchstatus,
  singlestatus:fetchstatusbyid,
  createStatus:recordstatus,
  updateStatus:updatestatusbyid,
  deleteStatus:deletestatusbyid
}
