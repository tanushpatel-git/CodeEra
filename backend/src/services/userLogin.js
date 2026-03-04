const User = require('../models/User');


const loginUserCheck = async (data) => {
     try{
         const {email} = data;
         return await User.findOne({
             email:email,
         })

     }catch(err){
         console.log(err);
     }
}

module.exports = loginUserCheck;