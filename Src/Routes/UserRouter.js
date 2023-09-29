const express = require('express');
const { insertUser, friendList, deleteUser } = require('../Controllers/User/UserController');
const { requestFriend, myRequests } = require('../Controllers/User/RequestController');
const { myChat } = require('../Controllers/Chat/ChatController');

const router = express.Router();

router.post('/insertUser', insertUser)
router.get('/friendList', friendList)
router.delete('/deleteUser', deleteUser)

router.post('/requestFriend', requestFriend)
router.post('/myRequests', myRequests)
router.post('/myChatRoom', myChat)


module.exports = router 