const express = require('express');
const { createAdmin } = require('../controllers/createAdmin');
const { loginAdmin } = require('../controllers/loginAdmin');
const router = express.Router();

router.post('/', (req, res, next) => {
    res.send('respond with a resource')
})

router.post('/create-admin', createAdmin)
router.post('/login', loginAdmin)

module.exports = router;