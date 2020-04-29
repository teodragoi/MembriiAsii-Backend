const express = require("express");
const bodyParser = require("body-parser");
const HttpStatusCodes = require("http-status-codes");
const member_model = require("../models/member_model.js");
const joi_member_schema = require("../utils/validation.js");

const mongoose = require("mongoose");
// async () => {
//     try {
//         await mongoose.connect(
//             "mongodb+srv://test:testtest@cluster0-tseuk.mongodb.net/testing",
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             }
//         )
//     } catch (err) {
//         console.log("db conn: " + err)
//     }
// }
// const collection = "members_collection";

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:testtest@cluster0-tseuk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let collection
client.connect(err => {
    collection = client.db("test").collection("members_collection");
    // perform actions on the collection object
    // client.close();
});
Object.freeze(collection)

const app = express();
app.use(bodyParser.json())


app.post(`/members`, async function (req, res) {
    // Validate token
    // Validate data
    const { new_member } = req.body;
    const { error } = joi_member_schema.validate(new_member)
    if (error) {
        console.log(error)
        return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({
            message: error.message,
            succes: false
        });
    }
    else console.log("ok, checking name")

    // Checking if the family name already exists. if not, add member
    try {
        const { family_name } = new_member;
        // const account = await collection.findOne({ family_name });
        // if (account) return res.status(409).json({
        //     message: "family name already in db",
        //     succes: false
        // });
        let to_add = new member_model(new_member);
        const WriteResult = await collection.insertOne(to_add);
        if (WriteResult.writeConcernError)
            if (WriteResult.nInserted == 0)
                return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                    "writeResult": WriteResult,
                    "success": "false"
                })
            else {
                return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                    "writeResult": WriteResult,
                    "succes": "true"
                })
            }
        else return res.status(HttpStatusCodes.ACCEPTED).json({
            "succes": "true"
        })
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "something happened",
            succes: false
        })
    }

})

app.listen(3001, () => console.log("started at port 3001"));