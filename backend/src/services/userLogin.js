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

const createUserInMongo = async (data) => {
    try{
        const user = await User.create(data);
        return user;
    }catch(err){
        console.error(err);
        throw err
    }
}

module.exports = {loginUserCheck,createUserInMongo};