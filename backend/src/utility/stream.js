const { StreamChat } = require("stream-chat");
const { StreamClient } = require("@stream-io/node-sdk");
require("dotenv").config({quiet: true});

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

const streamClient = new StreamClient(apiKey, apiSecret); // video
const chatClient = StreamChat.getInstance(apiKey, apiSecret); // chat

const upsertStreamUser = async (user) => {
    try {
        if (!user?.id) {
            throw new Error("User object must contain an id");
        }

        const response = await chatClient.upsertUser({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
        });
        console.log("Successfully upserted user in Stream");
        return response;

    } catch (err) {
        if (err.code === 16 && err.response?.data?.message?.includes("was deleted")) {
            console.log("User was hard deleted in Stream. User can login but chat features may not work until Stream user is manually reset.");
            return null;
        }
        console.error("Failed to upsert user in Stream", err);
        throw err;
    }
};

const deleteStreamUser = async (userId) => {
    try {
        const response = await chatClient.deleteUser(userId, {
            hard_delete: true,
        });
        console.log("Successfully deleted user in Stream");
        return response;

    } catch (err) {
        console.error("Failed to delete user in Stream", err);
        throw err;
    }
};

module.exports = {
    upsertStreamUser,
    deleteStreamUser,
    chatClient,
    streamClient
};