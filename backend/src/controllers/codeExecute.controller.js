const axios = require('axios');

const codeExecuteController = async (req, res) => {
    try {
        const { language, versionIndex, code } = req.body;

        const response = await axios.post("https://api.jdoodle.com/v1/execute", {
            clientId: process.env.JDOODLE_CLIENT_ID,
            clientSecret: process.env.JDOODLE_CLIENT_SECRET,
            script: code,
            language: language,
            versionIndex: versionIndex
        });

        return res.status(200).json(response.data);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = codeExecuteController;

