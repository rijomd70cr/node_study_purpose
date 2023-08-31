const express = require('express');
const { insertUser, friendList, deleteUser } = require('../Controllers/User/UserController');
const { requestFriend } = require('../Controllers/User/RequestController');

const router = express.Router();

router.post('/insertUser', insertUser)
router.get('/friendList', friendList)
router.delete('/deleteUser', deleteUser)

router.post('/requestFriend', requestFriend)

module.exports = router 