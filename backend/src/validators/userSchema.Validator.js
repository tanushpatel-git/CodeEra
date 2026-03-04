const Joi = require('joi');

const userValidator = async (req, res, next) => {
    try{
        const userSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        await userSchema.validate(req.body , {
            abortEarly: false, // show all error
            stripUnknown: true // remove extra value
        });
        next();
    }catch(err){
        return res.status(400).json({
            message:"Validation Error",
        });
    }
}

module.exports = userValidator;