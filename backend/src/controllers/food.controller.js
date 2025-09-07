const foodModel=require('../models/fooditem.model')

async function createFood(req,res){
    console.log(req.foodPartner)
    res.send("food item created")
}
module.exports={
    createFood
}