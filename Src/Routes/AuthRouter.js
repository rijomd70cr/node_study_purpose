const express = require('express');

const { doLogin, doSignup, changeDB } = require('../Controllers/User/AuthController');
const { validate } = require('../Middlewares/Validate');
const { login, signup } = require('../Validations/AuthValidation');

const router = express.Router();
router.post('/signup', validate(signup), doSignup);
router.post('/login', validate(login), doLogin);
router.post('/changeDB', changeDB);

module.exports = router;