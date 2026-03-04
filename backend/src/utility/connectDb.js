const mongoose = require('mongoose');
require('dotenv').config({quiet: true});

const connectDb = async () => {
    try{
        const url = process.env.MONGO_URL;
        await mongoose.connect(url)
        console.log("MongoDB Connected");
    }catch(e){
        console.error("Mongo db is not connected",e);
    }
}

module.exports = connectDb;