const mongoose= require ("mongoose")

const UserSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    status: {
    type: String,
    enum: ["user", "admin"],
    default: "user"  
  }
})
const UserModel=new mongoose.model("User", UserSchema)
module.exports=UserModel
