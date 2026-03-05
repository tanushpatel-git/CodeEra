const { StreamChat } = require("stream-chat");
require("dotenv").config({quiet: true});

const apiKey = process.env.STREAM_API_KEY;
const apiKeySecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiKeySecret) {
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

const chatStream = StreamChat.getInstance(apiKey, apiKeySecret);

const upsertStreamUser = async (user) => {
    try {
        if (!user?.id) {
            throw new Error("User object must contain an id");
        }

        await chatStream.upsertUser(user);
        console.log("Successfully upserted user in Stream");
    } catch (err) {
        console.error("Failed to upsert user in Stream", err);
    }
};

const deleteStreamUser = async (userId) => {
    try {
        await chatStream.deleteUser(userId.toString(), {
            hard_delete: true,
        });
        console.log("Successfully deleted user in Stream");
    } catch (err) {
        console.error("Failed to delete user in Stream", err);
    }
};

module.exports = { upsertStreamUser, deleteStreamUser, chatStream };