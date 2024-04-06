const succstory=require("../models/SuccessStories")

const fetchSuccess=async(req,res)=>{

  //Find Success Story
  const sucState=await succstory.find();
  //response
  res.json({SuccessStory:sucState})
}

//FetchByID

const sucbyid=async(req,res)=>{

  //get id by url
  const sucid=req.params.getid;

  console.log(req.params);

  //find Success Story by Id
  const sucmo=await succstory.findById(sucid)

  //respond
  res.json({SuccessStory:sucmo})

}


//Create Success Story
const createSuccess=async(req,res)=>{
  const{
    storyperson,
    storyjob,
    storyplace,
    storydate
  }=req.body;

  console.log(req.body)

  //Get Stories

  const wrSuccess= await succstory.create({
    SuccessName:storyperson,
    SuccessJob:storyjob,
    SuccessPlace:storyplace,
    SuccessDate:storydate,
    SuccessImage:req.CImage,
  })

  //Response with new testimonial
  res.json({
    SuccessStory:wrSuccess
  })



}

//Update

const successUpdate=async(req,res)=>{
  const{
    storyperson,
    storyjob,
    storyplace,
    storydate
  }=req.body;

  //updated data

  const id =req.params.id;
  console.log(id)
  
  try{
    const result=await succstory.findOne({_id:id});

    if(result)
    {
      result.SuccessName=storyperson || result.SuccessName;
      result.SuccessJob=storyjob || result.SuccessJob;
      result.SuccessPlace=storyplace || result.SuccessPlace;
      result.SuccessDate=storydate || result.SuccessDate;
      result.SuccessImage=req.CImage || result.SuccessImage;
      result.save();
      return res
      .status(200)
      .json({ status: "success", message: " Success Story Updated" });
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
  fetchSuccessData:fetchSuccess,
  fetchSuccessDatabyId:sucbyid,
  createSuccess:createSuccess,
  updateSucc:successUpdate
}