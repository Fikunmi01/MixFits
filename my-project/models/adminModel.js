const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    adminId: { type: Number, unique: true },
    username: String,
    email: String,
    password: String,
    gender: String,
    token: String,
    lastLogin: {
        type: Date,
        default: new Date()
    },
})

adminSchema.pre('save', async function (next) {
    const adminDoc = this;
    try {
        const lastAdminDoc = await mongoose.model('Admin', adminSchema)
            .findOne({}, {}, { sort: { adminId: -1 } })
            .exec()
        adminDoc.id = lastAdminDoc ? lastAdminDoc.id + 1 : 1;
        console.log('Admin Id:', adminDoc.id)

    }
    catch (err) {
        return next(err);
    }

});

const AdminModel = mongoose.model('Admin', adminSchema)

module.exports = AdminModel