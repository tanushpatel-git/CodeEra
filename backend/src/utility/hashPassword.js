const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    try{
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }catch(err){
        console.error("Fail to do hashing")
    }
}

const passwordVerify = async (details,hashPassword) => {
    try{
        return await bcrypt.compare(details, hashPassword);
    }catch(err){
        console.error("Fail to do check hashing")
    }
}

module.exports = {hashPassword,passwordVerify};