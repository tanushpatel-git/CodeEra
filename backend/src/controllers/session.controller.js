const Session = require("../models/Session.model");
const {streamClient, chatClient} = require("../utility/stream");


const createSession = async (req, res) => {
    try {
        const {problem, difficulty} = req.body;
        const {id} = req.user;

        // generate a unique call id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        // create session in db
        const session = await Session.create({
            problem: problem, difficulty: difficulty, host: id, callId,
        })

        //create stream for video call
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: id, custom: {
                    problem, difficulty, sessionId: session._id.toString(),
                },
            },
        });

        // chat messaging
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`, created_by_id: id, members: [id]
        })

        await channel.create()
        res.status(200).json({session})
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "Internal Server Error"
        })
    }
}


const getActiveSession = async (_, res) => {
    try {
        const session = await Session.find({status: "active"}).populate("host", "name _id email image").sort({createdAt: -1}).limit(20)
        return res.status(200).json({session})
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const getMyRecentSession = async (req, res) => {
    try {
        const userId = req.user.id;
        const session = await Session.find({
            status: "completed", $or: [{
                host: userId
            }, {
                participant: userId
            }]
        }).sort({createdAt: -1}).limit(20);

        return res.status(200).json({session})

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const getSessionById = async (req, res) => {
    try{
        const {id} = req.params;
        const session = await Session.findById(id).populate("host", "name _id email").populate("participant", "name _id email")
        if (!session) return res.status(404).json({message: "Seems not found."})
        return res.status(200).json({session})
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


const joinSession = async (req, res) => {
    try{
        const {id} = req.params;
        const userId = req.user.id;
        const session = await Session.findById(id);
        if (!session) return res.status(404).json({message: "Session not found."})

        if(session.host.toString() === userId.toString()){
            return res.status(400).json({
                message: "Host can't be join their own session as participant"
            })
        }

        if (session.participant) return res.status(409).json({message: "Session is full"})
        session.participant = userId;
        await session.save()

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers(userId);

        return res.status(200).json({session})
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"})
    }
}


const endSession = async (req, res) => {
    try{
        const {id} = req.params;
        const userId = req.user.id;
        const session = await Session.findById(id)
        if (!session) return res.status(404).json({message: "Session not found."})
        // check if user is host or not

        if (session.host.toString() !== userId.toString()) return res.status(403).json({message: "Session can only end by host"})

        // check if session is already completed

        if (session.status === "completed") return res.status(200).json({message: "Session is completed"})

        // delete stream video call
        const call = streamClient.video.call("default", session.callId);
        await call.delete({hard: true})

        // delete chat message
        const channel = chatClient.channel("messaging",session.callId)
        await channel.delete();

        session.status = "completed"
        await session.save()

    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {createSession, getActiveSession, getMyRecentSession, getSessionById, joinSession, endSession};