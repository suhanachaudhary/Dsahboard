const mongoose=require("mongoose");

const sessionSchema= new mongoose.Schema({
    user: {type:String, required:true},
    start: {type:Date},
    end:{type:Date},
    attendees: {type:Array}
  });

  const Session = mongoose.model('Session',sessionSchema);  
  module.exports=Session;
  