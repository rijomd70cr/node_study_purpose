const express = require('express')
const { insertUser, friendList, deleteUser } = require('../Controllers/UserController')
const router = express.Router();

router.post('/insertUser', insertUser)
router.get('/friendList', friendList)
router.delete('/deleteUser', deleteUser)

module.exports = router 