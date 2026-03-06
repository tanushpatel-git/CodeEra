const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    problem:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        required:true,
        enum:["easy","medium","hard"],
    },
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null,
    },
    status:{
        type:String,
        enum:["active","completed"],
        default:"active",
    },
    // stream video call id
    callId:{
        type:String,
        default:""
    }
},{timestamps:true});


const Session = mongoose.model('Session',sessionSchema);
module.exports = Session;