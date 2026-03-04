const {jsonTokenCreate,tokenVerify} = require('../utility/jsonTokenCreate');
const createUserInMongo = require('../services/createUserInMongo')
const loginUserCheck = require('../services/userLogin');
const {passwordVerify} = require('../utility/hashPassword')
const upsertStreamUser = require("../utility/stream");
const deleteStreamUser = require("../utility/stream");


const userCreate = async (req, res) => {
    try{

        const data = req.body;
        const userData = await createUserInMongo(data)
        const token = await jsonTokenCreate(userData);

        // Send token in cookie
        res.cookie('token', token, {
            httpOnly: true,   // JS can't access it (secure)
            secure: false,    // true in production (HTTPS)
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // await upsertStreamUser(userData)

        return res.status(200).json({
            status: 'success',
            message: 'User created successfully',
            data: userData,
            token: token,
        })

    }catch(err){

        return res.status(500).json({
            message:"Internal Server Error",
        })

    }
}

const userLogin = async (req, res) => {
    try{
        const data = req.body;
        const userData = await loginUserCheck(data);
        if (!userData) {
            return res.status(404).json({message: 'User does not exist'});
        }
        const resultOfPasswordVerify = await passwordVerify(data.password, userData.password);
        if (resultOfPasswordVerify) {
            const token =  await jsonTokenCreate(userData);
            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
            });
            // upsertStreamUser(userData)
            return res.status(200).json({
                status: 'success',
                message: 'User login successfully',
            })
        }else{
            return res.status(200).json({
                status:"failure",
                message: 'User login failed',
            })
        }
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

const userLogout = async (req, res) => {
    try {
        // const token = req.cookie.token;
        // const {id} = tokenVerify(token);
        res.cookie('token', null, { httpOnly: true, secure: false, sameSite: 'strict' });
        // deleteStreamUser(id);
        return res.status(200).json({
            status: 'success',
            message: 'User logged out successfully',
        })

    }catch(err){

        return res.status(500).json({
            message:"Internal Server Error",
        })

    }
}

const getUser = async (req, res) => {
    try{
        const token = req.cookie.token;
        // const {token} = req.body   // checking purpose send manually token from postman
        const dataFromToken = await tokenVerify(token);
        const data = await loginUserCheck(dataFromToken);
        if (!data) {
            return res.status(404).json({
                status: 'failure',
                message: 'User not found',
            })
        }
        return res.status(200).json({
            status: 'success',
            message:"User is exist",
            data: data,
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

module.exports = {userCreate,userLogout,userLogin,getUser};