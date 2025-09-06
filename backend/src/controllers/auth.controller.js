const userModel=require("../models/usermodel")
const foodPartnerModel=require("../models/foodPartner.model")
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken')

async function registerUser(req,res){
    const{fullname,email,password}=req.body;
    const isUserAlreadyExists=await userModel.findOne({
        email
    })
    if(userAlreadyExists){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        fullName,
        email,
        password:hashedPassword
    })
    const token=jwt.sign({
        id:user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"User registered succesfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullname
        }
    })
}

async function loginUser(req,res)=>{
    const {email,password} = req.body;

    const user=await userModel.findOne({
        email
    })
    if(!user){
        res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid user or password"
        })
    }
    const token=jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(200).json({
        message:"User logged in succesfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })

}

 function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out succesfully"
    })
 }

 async function registerFoodPartner(req,res){
    const{name,email,password}=req.body;
    const isAccountAlreadyExists=await foodPartnerModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message:"Food partner already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword

    })
    const token=jwt.sign({
        id: foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(201).json({
        message:"Food partner registered  succesfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })

 }
 async function loginFoodPartner(req,res){
    const{name,email,password}=req.body;
    const FoodPartner=await foodPartnerModel.findOne({
        email
    })
    if(!foodPartner){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,foodPartner.password);
    
    const token=jwt.sign({
        id: foodPartner._id,
    },process.env.JWT_SECRET)
    res.cookie("token",token)

    res.status(201).json({
        message:"Food partner registered  succesfully",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })
 }

 function logoutFoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"food partner logged out succesfully"
    })
 }
module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
}