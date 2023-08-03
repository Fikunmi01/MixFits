const AdminModel = require("../models/adminModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'ASA'

exports.createAdmin = async (req, res, next) => {
    const { username, email, password, gender } = req.body;
    try {
        const user = await AdminModel.findOne({ email });
        if (user) {
            res.send({
                status: 409,
                message: 'User already exists'
            });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            let newAdmin = new AdminModel({
                username: username,
                email: email,
                password: hashedPassword,
                gender: gender,
            });

            const userPayload = newAdmin.toObject()
            const token = jwt.sign(userPayload, SECRET_KEY)
            newAdmin.token = token

            await newAdmin.save()
            console.log("User successfully created")
            res.send({
                status: 200,
                message: 'Account successfully created'
            })

        }
    }
    catch (err) {
        console.log("Error during creating account", err);
        res.send({
            status: 500,
            message: "Internal server error"
        });
    }
}