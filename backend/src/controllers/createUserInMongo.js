const User = require('../models/User');
const connectDb = require('../utility/connectDb')

const createAUser = async () => {
    try{
        await connectDb()
        const user1 = {
            name:"Tanush",
            email:"tanush000pate@gmail.com"
        }
        await User.create(user1)
        console.log("user1 created")
    }catch(err){
        console.log(err);
    }
}
createAUser();