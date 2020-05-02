const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017/asii_members";
const collection = "asii_members_collection";
mongoose
    .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(conn => console.log("db is ok"))
    .catch(err => {
        console.log("db is not ok: ");
        console.log(err);
    });

module.exports = { mongoose, collection }