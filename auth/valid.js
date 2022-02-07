const Joi = require('joi');

exports.reg_valid = (data) => {

    const registerSchema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(5)
            .max(255)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        password: Joi.string()
            .min(5)
            .max(16)
            .required(),

        profile:join.string()
        .default(null),

        role:Joi.string()
        .alphanum()
        .default('member')
    })
    return registerSchema.validate(data);
}


exports.login_valid = (data) => {
    const loginSchema = Joi.object({

        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        password: Joi.string()
            .required(),
    })
    return loginSchema.validate(data);
}


exports.booking_valid = (data) => {

    const bookingSchema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(5)
            .max(255)
            .required(),

        email: Joi.string()
            .email()
            .required(),

        phone: Joi.string()
            .min(10)
            .max(10)
            .required(),

        city:Joi.string()
        .required(),

        state:Joi.string()
        .required(),

        date:Joi.string()
        .required(),

        message:Joi.string()
        .required()
        
    })
    return bookingSchema.validate(data);
}


exports.doctor_valid = (data) => {

    const doctorSchema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(255)
            .required(),

        specialist: Joi.string()
            .required(),

        qualification: Joi.string()
            .required(),

        expirence:Joi.string()
        .required(),

        profile:Joi.string()
        .required(),
    })
    return doctorSchema.validate(data);
}


exports.banner_valid = (data) => {
    const bannerSchema = Joi.object({
        picture:Joi.string()
        .required(),
    })
    return bannerSchema.validate(data);
}


exports.comment_valid = (data) => {

    const commentSchema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(255)
            .required(),

        email: Joi.string()
            .email()
            .required(),

        comment: Joi.string()
            .required(),

        star:Joi.array()
        .default(5),

        profile:Joi.string()
        .required(),
    })
    return commentSchema.validate(data);
}