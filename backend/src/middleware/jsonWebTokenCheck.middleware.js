const {tokenVerify} = require('../utility/jsonTokenCreate')

const auth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // attach user to req
        req.user =  await tokenVerify(token);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;