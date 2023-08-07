const express = require('express')
const { insertUser } = require('../Controllers/UserController')
const router = express.Router();

router.post('/insertUser', insertUser)

module.exports = router 