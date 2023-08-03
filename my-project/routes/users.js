var express = require('express');
const { createUser } = require('../controllers/createUser');
const { loginUser } = require('../controllers/loginUser');
const { updateUser } = require('../controllers/updateUser');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-account', createUser)
router.post('/login', loginUser)
router.put('/update-profile/:id',updateUser)

module.exports = router;
