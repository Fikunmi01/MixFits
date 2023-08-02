// Middleware to generate random transaction ID
const generateTransactionId = (req, res, next) => {
    // Generate a random alphanumeric string as the transaction ID
    const transactionId = Math.random().toString(36).substr(2, 10).toUpperCase();

    // Attach the transaction ID to the response locals
    res.locals.transactionId = transactionId;

    next();
}
