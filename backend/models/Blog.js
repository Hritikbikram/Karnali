const mongoose=require("mongoose")

const BlogSchema=new mongoose.Schema({
  BlogName:String,
  BlogAuthor:String,
  BlogDate:String,
  BlogContent:String,
  BlogImage:String,
})

const blog=mongoose.model('blog',BlogSchema);

module.exports=blog;