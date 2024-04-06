//LOAD ENV
if(process.env.NODE_ENV != "production")
{
  require("dotenv").config();
}

// Import Dependencies

const express=require("express")
const fileUpload = require("express-fileupload");
const cors=require("cors")

const connectdb=require("./config/connectdb")




// Create express app
const app=express();
app.use(cors());
app.use(express.json());

app.use(
  fileUpload({
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
    createParentPath: true,
    abortOnLimit: true,
  })
);





//Database Connection
connectdb();

// Routing
app.get('/',(req,res)=>{
  res.json({hello:"World"})
})

app.use("/uploads", express.static("uploads"));

// CourseStatus 
const classControllers=require("./Controllers/StatusControllers")

//Fetch
app.get('/coursestates',classControllers.fetchStatus)
//FetchByID
app.get('/coursestates/:id',classControllers.singlestatus)
//Enter or Create
app.post("/coursestates",classControllers.createStatus)
//Update
app.put("/coursestates/:id",classControllers.updateStatus)
//Delete by id
app.delete("/coursestates/:id",classControllers.deleteStatus)




//Enqueries
const querycontrol=require("./Controllers/QueryControllers");

//Fetch
app.get('/queries',querycontrol.fetchQueriess)
//FetchById
app.get('/queries/:id',querycontrol.fetchQueriesbyid)
//CreateQuery
app.post('/queries',querycontrol.createquerr)



//CourseDetails
const coursedetailscontrol= require("./Controllers/CourseDetailsController");

//fetch
app.get("/coursedetail",coursedetailscontrol.fetchCourseDet)
//FetchById
app.get("/coursedetail/:getid",coursedetailscontrol.fetchDetailsbyID)
//Create
app.post("/coursedetail",coursedetailscontrol.recordDetails)
//Update
app.put('/coursedetail/update/:id',coursedetailscontrol.courseDetailUpdate)



//UsersRecords

const usercontrol=require("./Controllers/UserAllController");

//fetch
app.get("/user",usercontrol.fetchUsers);
//fetchbyid
app.get("/user/:getid",usercontrol.fetchUsersbyid);
//delete
app.delete("/user/:delid",usercontrol.deleteUsers);


const userRoute = require("./route/UserRoute");

//create
// app.post("/user",usercontrol.createUser);

//login
// app.post("/login",usercontrol.userLogin);





//contact

const contactcontrol=require("./Controllers/ContactController")

//fetch
app.get("/contact",contactcontrol.fetchContact)
//Create
app.post("/contact",contactcontrol.recordContact)






// About Page
// CURD About Page
const aboutControl=require("./Controllers/AboutController");
const { fileCheck } = require("./authentication/FileCheck");
const { updatefilecheck } = require("./authentication/UpdateFileCheck");

//Fetch
app.get('/about',aboutControl.fetchAboutdata)
//FetchById
app.get('/about/:getId',aboutControl.fetchAboutdataById)
//CreateAbout
app.post('/about',fileCheck,aboutControl.createAboutdata)
//Update
app.put('/about/update/:id',updatefilecheck,aboutControl.updateAboutdata)
//Delete
app.delete('/about/:id',aboutControl.deleteAboutdata)





//ClassCourse
const ClassPageControl=require('./Controllers/ClassController')
const {courscheck}=require('./authentication/CourseCheck');
const {updatecourscheck}=require('./authentication/CourseCheckUpdate')
//fetch
app.get('/classcourse',ClassPageControl.gtclass)
//fetchClassbyid
app.get('/classcourse/:getid',ClassPageControl.gtclassid)
//createClass
app.post('/classcourse',courscheck,ClassPageControl.ctclass)
//UpdateClass
app.put('/classcourse/update/:id',updatecourscheck,ClassPageControl.uptclass)







//Testimonials
const testimonialdata=require("./Controllers/TestimonialsController");
const {testimocheck}=require("./authentication/TestimonialCheck");
const {updatetestimonialcheck}=require("./authentication/UpdateTestimoCheck")

//Fetch
app.get('/testimonial',testimonialdata.fetchTestimonialData);
//FetchById
app.get('/testimonial/:getid',testimonialdata.fetchTestimonialDatabyId);
//create
app.post('/testimonial',testimocheck,testimonialdata.createTestimonial);
//Update
app.put('/testimonial/update/:id',updatetestimonialcheck,testimonialdata.updateTestimonies)







//SuccessStories
const successdata=require("./Controllers/SuccessStoriesController");
const { successChecks } = require("./authentication/SuccessStoriesCheck");

const { UpdateSuccessChecks } = require("./authentication/UpdateSuccessCheck");



//Fetch
app.get('/success',successdata.fetchSuccessData);
//FetchById
app.get('/success/:getid',successdata.fetchSuccessDatabyId);
//create
app.post('/success',successChecks,successdata.createSuccess);
//update
app.put('/success/update/:id',UpdateSuccessChecks,successdata.updateSucc);


//Admission
const admissionData=require("./Controllers/AdmissionController");
const {admisscheck}=require("./authentication/AdmissionCheck")

//fetch
app.get('/admission',admissionData.fetchAdmissionData);
//fetchbyid
app.get('/admission/:getid',admissionData.fetchAdmissionDataById);
//create
app.post('/admission',admisscheck,admissionData.createAdmission);


//Blogs
const blogdata=require("./Controllers/BlogController");
const {blogChecks}=require("./authentication/BlogCheck")
const {updateblogChecks}=require("./authentication/UpdateBlogCheck")

app.get('/blog',blogdata.fetchBlog);
//fetchbyid
app.get('/blog/:getid',blogdata.blogbyid);
//create
app.post('/blog',blogChecks,blogdata.createBlogs);
//update
app.put('/blog/update/:id',updateblogChecks,blogdata.updateBlogs);



//user register login

app.use(userRoute);



//Start our server

app.listen(process.env.PORT)