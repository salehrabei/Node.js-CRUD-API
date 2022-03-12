const res = require("express/lib/response");
const { StatusCodes } = require("http-status-codes");
const User = require("../Model/user.model");
const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  console.log(req.user);
  if (req.user.role=="admin"){
  const users = await User.find({}).select("-password");
   res.json({ message: "All users", data: users });
  }else{
    res.status(StatusCodes.UNAUTHORIZED).json({message:"UNAUTHORIZED"});
  }
  
};

const signup = async (req, res) => {
  let { name, email, level, password,Department, role } = req.body;
  try {
     const user= await User.findOne({email})
     if(user){
       res.status(StatusCodes.BAD_REQUEST).json({
         message:"email is already exists"
       });
     }else{
     let newUser = new User({ name, email, level, password,Department , role });
      await newUser.save();
      res.status(StatusCodes.CREATED).json({ message: "registed success" });
     }
    
  } catch (errors) {
    res.json({ message: "error", ...errors });
  }
};
const sign_in = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      res.status(StatusCodes.BAD_REQUEST).json({
        message:"email not found"
      })}else{
        const match = await bcrypt.compare(password,user.password)
       if(match){
         const token = jwt.sign({ _id:user._id, role:user.role} ,"shhhh");
         //const decoded = jwt.verify(token,"shhhh");
        res.status(StatusCodes.OK).json({
          token,
          user:{
            id:user.id,
            name :user.name,
            email :user.email,
            level: user.level,
            Department: user.Department,
            
          },
        });
       }else{
        res.status(StatusCodes.BAD_REQUEST).json({
          message:"passwoed not correct"
        });
       }
       
      }
  } catch (error) {
    res.json({ message: "error", error  });
  }
};

const sign_out = (req, res) => {
  req.logout();
  res.redirect('/signin');
};

const getUser = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.json({ message: "success", user });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    const user = await User.deleteOne({ _id: id });
    res.json({ message: "deleted success", user });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  try {
    const user = await User.updateOne({ _id: id }, { name: name });
    res.json({ message: "updated success", user });
  } catch (error) {
    res.json({ message: "error", error });
  }
};

module.exports = {
  getAllUsers,
   signup,
  getUser,
  deleteUser,
  updateUser,
  sign_in,
  sign_out
};
