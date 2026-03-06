const {chatClient} = require("../utility/stream")


const getStreamToken = async(req, res) => {
    try{
        const token = chatClient.createToken(req.user.id)
        res.status(200).json({
            token,
            userName: req.user.name,
            userId: req.user.id,
        })

    }catch(err){
        res.status(400).send({
            message:"Internal Server Error"
        })
    }
}

module.exports = {getStreamToken};