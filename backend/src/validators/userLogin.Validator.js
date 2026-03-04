const Joi = require('joi')


const userLoginValidator = async (req, res, next) => {
    try{
        const loginValidator = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })
        await loginValidator.validate(req.body, {
            abortEarly: false, // show all error
            stripUnknown: true // remove extra value
        })
        next();
    }catch(err){
        res.status(401).send({
            message: "Validation error",
        })
    }
}
module.exports = userLoginValidator