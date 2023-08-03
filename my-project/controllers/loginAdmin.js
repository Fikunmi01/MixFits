const AdminModel = require("../models/adminModel")
const bcrypt = require('bcrypt')
const SECRET_KEY = 'ASA'
const jwt = require('jsonwebtoken')

exports.loginAdmin = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const admin = await AdminModel.findOne({ email })
        if (!admin) {
            console.log('No accounts found')
            res.send({
                status: 401,
                message: 'No account associated with this email'
            })
        }
        else {
            const matchPassword = await bcrypt.compare(password, admin.password)
            const tokenKey = admin.token
            const decoded = jwt.verify(tokenKey, SECRET_KEY, { expiresIn: '1h' })

            if (matchPassword) {
                res.send({
                    status: 200,
                    message: 'Admin logged in successfully'
                })
            }
            else {
                res.send({
                    status: 401,
                    message: 'Incorrect email address or password'
                })
            }

        }
    } catch (err) {
        console.log("Error during login", err);
        res.send({
            status: 500,
            message: "Internal server error"
        })
    }
}