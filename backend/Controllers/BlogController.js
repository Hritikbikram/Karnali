const blogs=require("../models/Blog")

const fetchBlog=async(req,res)=>{

  //find blogs
  const BlogState=await blogs.find();

  res.json({blog:BlogState})

}

//Fetch by id

const blogbyid=async(req,res)=>{

  //get id
  const blogid=req.params.getid;
  const blogmo=await blogs.findById(blogid)
  res.json({blog:blogmo})
}

const createBlogs=async(req,res)=>{
  const{
    blogti,
    blogau,
    blogda,
    blogcon    
  }=req.body;

  console.log(req.body)

  //Get Testimonial

  const wrBlogs= await blogs.create({
    BlogName:blogti,
    BlogAuthor:blogau,
    BlogDate:blogda,
    BlogContent:blogcon,
    BlogImage:req.CImage,
  })

  //Response with new testimonial
  res.json({
    blog:wrBlogs
  })
}


//Update Blog
const updateBlogs=async(req,res)=>{

  const{
    blogti,
    blogau,
    blogda,
    blogcon
  }=req.body;

  //updated data

  const id =req.params.id;
  console.log(id)
  
  try{
    const result=await blogs.findOne({_id:id});

    if(result)
    {
      result.BlogName=blogti || result.BlogName;
      result.BlogAuthor=blogau || result.BlogAuthor;
      result.BlogDate=blogda || result.BlogDate;
      result.BlogContent=blogcon || result.BlogContent;
      result.BlogImage=req.CImage || result.BlogImage;
      result.save();
      return res
      .status(200)
      .json({ status: "success", message: " Blogs Updated" });
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
  fetchBlog, blogbyid, createBlogs,updateBlogs
}