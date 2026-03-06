const Session = require("../models/Session.model");
const {streamClient} = require("../utility/stream");


const createSession = async (req, res) => {
    try {
        const {problem, difficulty} = req.body;
        const {id} = req.user;

        // generate a unique call id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        // create session in db
        const session = await Session.create({
            problem: problem,
            difficulty: difficulty,
            host: id,
            callId,
        })

        //create stream for video call
        await streamClient.video.call("default",callId).getOrCreate({
            data:{
                created_by_id:id,
                custom:{
                    problem,
                    difficulty,
                    sessionId :session._id.toString(),
                }
            }
        })

        // chat messaging pending

    } catch (err) {
        console.log(err);
        return res.status(400).json({
            message: "Internal Server Error"
        })
    }
}

const getActiveSession = async (req, res) => {

}

const getMyRecentSession = async (req, res) => {

}

const getSessionById = async (req, res) => {

}

const joinSession = async (req, res) => {

}

const endSession = async (req, res) => {

}

module.exports = {createSession, getActiveSession, getMyRecentSession, getSessionById, joinSession, endSession};