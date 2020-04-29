const Joi = require("@hapi/joi");

const joi_schema = Joi.object({
    surname: Joi.string()
        .required(),
    family_name: Joi.string()
        .required(),
    department: Joi.string()
        .required(),
    volunteer_description: Joi.string()
        .required(),
    facebook: Joi.string()
        .optional(),
    instagram: Joi.string()
        .optional(),
    linkedin: Joi.string()
        .optional(),
    pictureid: Joi.string()
        .required()
});

module.exports = joi_schema;