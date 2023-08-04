const mongoose = require('mongoose')
const adminSchema = mongoose.Schema({
    adminId: { type: Number, unique: true },
    userName: String,
    email: String,
    gender: String,
    password: String,
    lastLogin: {
        type: Date,
        default: new Date()
    },
});


adminSchema.pre('save', async function (next) {
    const doc = this;

    try {
        const lastDoc = await mongoose.model('Admin', adminSchema)
            .findOne({}, {}, { sort: { adminId: -1 } })
            .exec();

        // Set the id for the new document
        doc.adminId = lastDoc ? lastDoc.adminId + 1 : 1; // Generate a unique ID for the new user
        next(); // Proceed to save the document
    } catch (err) {
        return next(err); // Handle any errors
    }
});

const AdminModel = mongoose.model('Admin', adminSchema)

module.exports = AdminModel