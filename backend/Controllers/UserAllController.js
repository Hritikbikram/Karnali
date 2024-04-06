const aduser=require("../models/UserAll");
const encry=require("bcrypt");
const jwt=require("jsonwebtoken");





const fetchUsers=async(req,res)=>{
  const userstate=await aduser.find();
  res.json({user:userstate})
}

const fetchUsersbyid=async(req,res)=>{
  const userid=req.params.getid;
  console.log(req.params);

  const userdet=await aduser.findById(userid)
  res.json({user:userdet})
}

const createUser=async(req,res)=>{

  
  const {
    admname,
    admusername,
    admpassword,
    uspos
  }=req.body;
  console.log(req.body)


  try{
    const userExist=await aduser.findOne({UserName:admusername})

    if(userExist)
    {
    return res.status(400).json({ status: "error", message: "User already Exists" });
    }
    else{
            
      const hdpass= await encry.hash(admpassword,10);

      const wruser=await aduser.create({
        UserTitle:admname,
        UserName:admusername,
        UserPassword:hdpass,
        UserRoles:uspos
      });

      
     res.json({user:wruser})

    }

  }

  catch(e)
  {
    return res.status(400).json({ status: "error", message: `${e}` });
  }

  



}



const deleteUsers= async(req,res)=>{
  const userid=req.params.delid;
  console.log(req.params);

  try{
      const deuser=await aduser.findByIdAndDelete({ _id: userid});

      if(deuser)
      {
        let values=[];
        
        deuser.deleteOne;
        return res
        .status(200)
        .json({ status: "Success", message: " User Deleted" });
        
      }
      else{
        return res
        .status(200)
        .json({ status: "Failed", message: " User Not Found" });      
      }
  }
  catch(e){

    return res.status(400).json({ status: "error", message: `${e}` });

  }

};



// const userLogin=async(req,res)=>{
//   const{
//     UserName,
//     UserPassword
//   }=req.body;

//   try{
    
//   const alexist=await aduser.find({UserName:UserName});


//   if(alexist){
//     const checkpass=encry.compareSync(UserPassword, alexist.UserPassword);

//     if(checkpass)
//     {
//       const token= jwt.sign({id: alexist._id, UserRoles:alexist.UserRoles}, 'LoUseToE@123$%');

//       return res.status(200).json({
//         status:'success',
//         user:{
//           token,
//           UserName,
//           UserRoles:alexist.UserRoles
//         }
//       });
//     }
//     else
//     {
//       return res
//       .status(400)
//       .json({ status: "error", message: "Unable to Login" });
//     }


//   }
//   }
//   catch(e)
//   {

//   }
// }



const userLogin = async (req, res) => {
  const { UserName, UserPassword } = req.body;

  try {
    const userExists = await aduser.find({ UserName:UserName });

    if (userExists.length !== 0) {
      const matchPassword = bcrypt.compareSync(
        UserPassword,
        userExists[0].UserPassword
      );
      if (matchPassword) {
        const token = jwt.sign(
          {
            userID: userExists[0]._id,
            // userRole: userExists[0].UserRoles,
          },
          "tokencrypt"
        );
        return res.status(200).json({
          status: "success",
          users: {
            token,
          },
          // userRole: userExists[0].UserRoles,
        });
      } else {
        return res
          .status(200)
          .json({ status: "error", message: "Invalid Login Credential" });
      }
    } else {
      return res
        .status(200)
        .json({ status: "error", message: "User is not registered" });
    }
  } catch (e) {
    return res.status(400).json({ status: "error", message: `${e}` });
  }
};











module.exports={
  fetchUsers,
  fetchUsersbyid,
  createUser,
  deleteUsers,
  userLogin
}