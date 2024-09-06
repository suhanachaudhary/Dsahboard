const mongoose=require("mongoose");

const AvailabilitySchema= new mongoose.Schema({
    user: {
      type:String,
    },
  
    start: {
      type:Date,
    },
  
    end: {
      type:Date,
    },
  
    duration: {
      type:Number,
    },
  
    scheduledSlots: {
      type:Array,
    },
  });
const Availability = mongoose.model('Availability',AvailabilitySchema);
module.exports=Availability;