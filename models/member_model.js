const mongoose = require("mongoose");
const new_member_schema = mongoose.Schema({
    surname: {
        type: String,
        required: true
    },
    family_name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    volunteer_description: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    pictureid: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("new_member_model", new_member_schema);