const express = require('express');
const router = express.Router();

const { registerPage , registerDone ,loginDone ,  login, logOut, } = require('../Controllers/userRoutes.js');

router.get('/register' , registerPage);
router.post('/register',registerDone);
router.get('/login', login);
router.post('/login',loginDone);
router.post('/logout',logOut);

module.exports = router;