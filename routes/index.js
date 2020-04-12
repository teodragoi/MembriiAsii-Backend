
const express = require("express");
const bodyParser = require("body-parser");
const HttpStatusCodes = require("http-status-codes");
const user_model = require("../models/user_model.js");
const jwt = require("jsonwebtoken");
//const db = require("../utils/db_conn.js");
//const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
mongoose.connect(
    "mongodb+srv://test:testtest@cluster0-2rbig.gcp.mongodb.net/login_Testing",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const app = express();
app.use(bodyParser.json())

//hapi joi

app.post(`/login`, async function (req, res) {
    // Validate data before login
    const { email, password } = req.body;
    if (!email)
        return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({
            message: "you did not write your email",
            succes: false
        });
    if (!password)
        return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({
            message: "you did not write your password",
            succes: false
        });
    // Checking if the email exists
    try {
        const db = mongoose.connection;
        const account = await db.collection("accounts").findOne({ email });
        if (!account) return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({
            message: "Email not found",
            succes: false
        });

        //const valid_pass = await bcrypt.compare(password, account.password);?????
        const valid_pass = (password === account.password);
        if (!valid_pass)
            return res.status(HttpStatusCodes.EXPECTATION_FAILED).json({
                message: "wrong password",
                succes: false
            });

        //Create and assing a token
        console.log("creating token");
        const token = jwt.sign({ account }, 'privatekey', (err, token) => {
            if (err) { return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR) }
            return res.header("auth-token", token).json({ token });
        });
    } catch (error) {
        console.log(error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "something happened",
            succes: false
        })
    }

})

app.listen(3000, () => console.log("started at port 3000"));