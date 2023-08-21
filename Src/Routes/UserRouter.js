const express = require('express')
const { insertUser, friendList } = require('../Controllers/UserController')
const router = express.Router();

router.post('/insertUser', insertUser)
router.get('/friendList', friendList)

module.exports = router 