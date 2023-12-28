const express = require('express');
const { connectMultiDB } = require('../Config/db');

const { insertUser, friendList, deleteUser } = require('../Controllers/User/UserController');
const { requestFriend, myRequests } = require('../Controllers/User/RequestController');
const { myChat, changeDB } = require('../Controllers/Chat/ChatController');

const router = express.Router();

router.post('/insertUser', insertUser)
router.get('/friendList', friendList)
router.delete('/deleteUser', deleteUser)

router.post('/requestFriend', requestFriend)
router.post('/myRequests', myRequests)
router.post('/myChatRoom', myChat)
router.post('/changeDB', connectMultiDB, changeDB);


module.exports = router 