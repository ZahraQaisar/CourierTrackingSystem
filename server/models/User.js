const mongoose= require ("mongoose")

const UserSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const UserModel=new mongoose.model("User", UserSchema)
module.exports=UserModel
