const express = require("express");
const bodyParser = require("body-parser");
const HttpStatusCodes = require("http-status-codes");
const member_model = require("../models/member_model.js");
const { mongoose, collection } = require("../utils/dbconn.js");

const app = express();
app.use(bodyParser.json())


app.get(`/all_members`, async function (req, res) {
    console.log("ok /allmembers")
    let all_members
    // try {
    await member_model.find({}, (err, data) => {
        //bucata gasita pe stackoverflow
        //help, dc nu s ar putea si fara callback function? (asa cum as fi vrut eu)
        if (err) {
            console.log("getting allmembers err: ")
            console.log(err);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                "succes": "false"
            });
        }
        if (!ImageData)
            return res.status(404).json({
                "members": data,
                "message": "no members in db",
                "succes": "false"
            })
        return res.status(200).json({
            "members": data,
            "succes": "true"
        })
    });
    // } catch (err) {
    //     console.log("get all members err: " + err);
    //     return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
    //         succes: false
    //     });
    // }
    // return res.status(200).json({
    //     members: all_members,
    //     succes: true
    // })
})

app.get(`/member_by_id`, async function (req, res) {
    const { id } = req.body;
    if (!id) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
            "succes": "false",
            "message": "no id given"
        })
    }
    // try {
    //     let member = await member_model.findOne({});
    // } catch (err) {
    //     console.log("err getting member with requested id (" + search_id + "): " + err);
    //     return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    // }
    // return res.status(200).json({
    //     "member": member,
    //     succes: true
    // })
    await member_model.findOne({ "_id": id }, (err, data) => {
        if (err) {
            console.log("getting member by id err: ")
            console.log(err);
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                "succes": "false"
            });
        }
        if (!data)
            return res.status(404).json({
                "members": data,
                "message": "no such id in db",
                "succes": "false"
            })
        return res.status(200).json({
            "members": data,
            "succes": "true"
        })
    });
})

app.listen(3001, () => console.log("started at port 3001"));