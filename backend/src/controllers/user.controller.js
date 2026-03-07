const {jsonTokenCreate,tokenVerify} = require('../utility/jsonTokenCreate');
const {loginUserCheck,createUserInMongo} = require('../services/userLogin');
const {passwordVerify, hashPassword} = require('../utility/hashPassword');
const { upsertStreamUser, deleteStreamUser } = require("../utility/stream");


const userCreate = async (req, res) => {
    try{
        const data = req.body;
        const hashPass = await hashPassword(data.password);
        const userData = {...data,password:hashPass};
        const createdUser = await createUserInMongo(userData);
        const token = await jsonTokenCreate(createdUser);

        await upsertStreamUser(createdUser)

        // Send token in cookie
        res.cookie('token', token, {
            httpOnly: true,   // JS can't access it (secure)
            secure: false,    // true in production (HTTPS)
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            status: 'success',
            message: 'User created successfully',
            data: createdUser,
            token: token,
        })

    }catch(err){
        console.error("User create error:", err);
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
                sameSite: 'lax',
            });
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
        console.error("Login error:", err);
        return res.status(500).json({
            message:"Internal Server Error",
        })
    }
}

const userLogout = async (req, res) => {
    try {
        const token = req.cookies.token;
        const {id} = await tokenVerify(token)
        if (!id) return res.status(401).json({message: 'You are not allow to log out ! their is something went wrong'});
        res.cookie('token', null, { httpOnly: true, secure: false, sameSite: 'strict' });
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
        const token = req.cookies.token;
        if (!token) {
            return res.status(200).json({message: 'You are not logged in'});
        }
        const dataFromToken = await tokenVerify(token);
        if (!dataFromToken) {
            return res.status(200).json({
                status: 'failure',
                message: 'User not found',
                data:null
            })
        }
        return res.status(200).json({
            status: 'success',
            message:"User is exist",
            data: dataFromToken,
        })
    }catch(err){
        return res.status(200).json({
            message:"Not authenticated",
        })
    }
}

module.exports = {userCreate,userLogout,userLogin,getUser};