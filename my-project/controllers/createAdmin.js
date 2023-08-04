const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');
const SECRET_KEY = 'ASA';

exports.createAdmin = async (req, res, next) => {
    const { email, password, username, gender } = req.body;

    try {
        const user = await AdminModel.findOne({ email });

        if (user) {
            res.send({
                status: 409,
                message: "User already exists"
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);

            let newAdmin = new AdminModel({
                username: username,
                gender: gender,
                email: email,
                password: hashedPassword,
            });

            const adminPayload = newAdmin.toObject();

            const token = jwt.sign(adminPayload, SECRET_KEY);
            newAdmin.token = token
            await newAdmin.save();
            console.log("Admin successfully created");
            res.send({
                status: 200,
                message: "Account successfully created",
            });
        }
    } catch (err) {
        console.log("Error during creating account", err);
        res.send({
            status: 500,
            message: "Internal server error"
        });
    }
};
