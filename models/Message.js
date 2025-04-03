const mongoose=require('mongoose')

const messageschema=new mongoose.Schema({
    message:String,
})

const messagemodel=mongoose.model("message model",messageschema);
module.exports=messagemodel;