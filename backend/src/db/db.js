const mongoose=require('mongoose')

function connectDB(){
    mongoose.connect("mongodb://localhost:27017/fooddelivery")
    .then(()=>{
        console.log("Mongodb connected")
    })
    .catch((err)=>{
        console.log("Momgodb error:",err);
    })
}
module.exports=connectDB;