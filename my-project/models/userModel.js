const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    id: { type: Number, required: true, unique: true, default: 0 },
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    walletAddress: String,
    balance: String,
    transaction: {
        transactionId: String,
        type: String,
        amount: String,
        date: {
            type: Date,
            default: new Date()
        }
    },
    password: String,

})


// Auto-incrementing ID middleware
userSchema.pre('save', function (next) {
    const doc = this;
    // Check if the document is new or being updated
    if (doc.isNew) {
        // Find the highest id in the collection and increment it
        mongoose.model('User', userSchema).findOne({}, {}, { sort: { id: -1 } }, (err, lastDoc) => {
            if (err) {
                return next(err);
            }
            // Set the id for the new document
            const id = doc.id = lastDoc ? lastDoc.id + 1 : 0;
            next();
            console.log('User Id:', id)
        });
    } else {
        next();
    }
});



const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel