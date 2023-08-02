const UserModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'ASA';

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            res.send({
                status: 401,
                message: "No account associated with this email"
            });
        } else {
            const matchPassword = await bcrypt.compare(password, existingUser.password);

            if (matchPassword) {
                console.log('User successfully logged in');
                const token = jwt.sign(
                    { email: existingUser.email, id: existingUser._id },
                    SECRET_KEY,
                    { expiresIn: '1h' }
                );
                res.send({
                    status: 200,
                    message: "User successfully logged in",
                    token: token // Include the token in the response
                });
            } else {
                res.send({
                    status: 401,
                    message: "Incorrect email address or password"
                });
            }
        }
    } catch (err) {
        console.log("Error during login", err);
        res.send({
            status: 500,
            message: "Internal server error"
        });
    }
};
