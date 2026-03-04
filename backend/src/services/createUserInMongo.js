const {hashPassword} = require("../utility/hashPassword");
const User = require("../models/User");


const createUserInMongo = async (data) => {
    try{
        const hashData = await hashPassword(data.password);
        const newhashPassUserData = {...data, password: hashData};
        return await User.create(newhashPassUserData);
    }catch(err){
        console.error("user is not create in mongo db" , err)
    }
}

module.exports = createUserInMongo;