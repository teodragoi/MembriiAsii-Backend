const express = require("express");
const bodyParser = require("body-parser");
const HttpStatusCodes = require("http-status-codes");
const member_model = require("../models/member_model.js");
const joi_member_schema = require("../utils/validation.js");

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
            "message": error.message,
            "succes": "false"
        });
    }

    //add member
    try {
        let to_add = new member_model(new_member);
        const WriteResult = await to_add.save(new_member);
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
            "message": "something happened",
            "succes": "false"
        })
    }

})

app.listen(3001, () => console.log("started at port 3001"));