const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
  UserTitle:String,
  UserName:String,
  UserPassword:String,
  UserRoles:String
})

const UserInfos=mongoose.model('UserDetail',UserSchema);

module.exports=UserInfos;