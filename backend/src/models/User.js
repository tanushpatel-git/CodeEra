const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://www.kindpng.com/picc/m/620-6203229_whatsapp-profile-picture-icon-png-download-instagram-profile.png",
    }
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema);
module.exports = User;