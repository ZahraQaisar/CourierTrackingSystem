const mongoose= require ("mongoose")

const TrackSchema= new mongoose.Schema({
    tracking_number:String,
    parcel_status:String,
    delivery_date:String,
    location: String
})
const TrackModel=new mongoose.model("Track", TrackSchema)
module.exports=TrackModel
