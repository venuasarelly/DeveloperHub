const asynchandler = require('express-async-handler');
const UserList = require('../../model/userModel');
const ratingList = require('../../model/ratingModel');
const dotenv = require('dotenv').config();
const { ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');

const postUser = asynchandler(async (req, res) => {
try {
    const { username, email, contact, skill, password, confirmPassword } = req.body;
    const user = new UserList({ username, email, contact, skill, password, confirmPassword });
    const exist = await UserList.find({email});
    if(!exist){
        res.status(200).json({message : " User already exist"})
    }
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const allProfiles= asynchandler(async (req, res) => {
    try {
        
        let Data = await UserList.find()
        res.status(200).json(
            {
                status: true,
                data: Data
            });
    } catch (e) {
        res.status(404).json(
            {
                status: false,
                message: e.message,
                data: {}
            }
        )

    }

})

const loginUser = asynchandler(async(req,res)=>{
    try {
        const { email, password } = req.body;
        const exist = await UserList.findOne({ email });
        if (!exist) {
          return res.status(404).send("Email does not exist");
        }
        if (exist.password !== password) {
          return res.status(404).send("Password does not match");
        }
    
        // Generate JWT token
      //   const token = jwt.sign({ user: exist }, 'jwtSecret', { expiresIn: '1h' });
      //   res.json({ message: "Login successful", token });
      let payload = {
        user : {
          id : exist.id
        }
      }
      jwt.sign(payload,'jwtSecret',{expiresIn :300000},
      (err,token) =>{
        if(err)  throw err
        return res.json({token})
      }
      )
    
    } catch (err) {
        console.log(err);
        return res.status(500).send("Server error");
      }
      
})


const myProfile = asynchandler(async(req,res)=>{
 try{
  const user = await UserList.findById(req.user.id);
  return res.json(user)
 }catch(err){
  console.log(err);
  return res.status(500).send("server error")
 }
})

const addReview = asynchandler(async(req,res)=>{
  try{
      const{taskworker,rating} = req.body;
      const exist = await UserList.findById(req.user.id);
      const data = new ratingList({
        taskprovider : exist.fullname,
        taskworker,rating
      })
      await data.save();
      console.log(data);
      return res.status(200).send("review updated successfully")
  }catch(err){
    console.log(err)
  }
})

const myReview = asynchandler(async(req,res)=>{
  try{
     const allreviews = await ratingList.find();
     console.log(allreviews)
     const myreviews = allreviews.filter(review=>review.taskworker.toString === req.user.id.toString);
     return res.status(200).json(myreviews);
  }catch(err){
    console.log(err)
  }
})
module.exports = {
    postUser,
    allProfiles,
    loginUser,
    myProfile,
    addReview,
    myReview
  }