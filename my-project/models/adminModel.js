    const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    adminId: Number,
    userName: String,
    email: String,
    password: String,
    lastLogin: {
        type: Date,
        default: new Date()
    },
})

adminSchema.pre('save', function (next) {
    const adminDoc = this;
    if (adminDoc.isNew) {
        mongoose.model('Admin', adminSchema).findOne({}, {}, { sort: { adminId: -1 } }, (err, lastAdminDoc) => {
            if (err) {
                return next(err);
            }
            const adminId = adminDoc.adminId = lastAdminDoc ? lastAdminDoc + 1 : 0;
            console.log('Admin Id:', adminId)
            next();
        });

    }
    else {
        next();
    }
});

const AdminModel = mongoose.model('Admin', adminSchema)

module.exports = AdminModel