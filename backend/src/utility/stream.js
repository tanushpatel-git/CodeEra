const {StreamChat} = require("stream-chat")
require('dotenv').config({quiet: true});


const apiKey = process.env.STREAM_API_KEY;
const apiKeySecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiKeySecret) {
    console.error("No STREAM_API_KEY or STREAM_API_SECRET found.");
}

export const chatStream = StreamChat.getInstance(apiKey, apiKeySecret);

const upsertStreamUser = async (user) => {
    try {
        await chatStream.upsertUser(user); // user is in object type
        console.log("Successfully upserted user in stream");
    } catch (err) {
        console.error("Failed to upsert user in stream", err);
    }
}

const deleteStreamUser = async (userId) => {
    try {
        await chatStream.deleteUser(userId.toString()); // userId is in string type
        console.log("Successfully delete user in stream");
    } catch (err) {
        console.error("Failed to delete user in stream", err);
    }
}

module.exports = {upsertStreamUser, deleteStreamUser};
