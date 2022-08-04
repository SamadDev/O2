const express = require('express');
const { route } = require('express/lib/application');
const { register, login, getMe,updateDetails,logout } = require('../Controler/AuthController');

const router = express.Router();

const {protect }= require('../Midlware/AuthMidleware');

router.post('/register', register);
router.post('/login', login);
router.get('/logout',protect,logout)
router.get('/me',protect,getMe);
router.get('/getAllUser',protect,getAllUser);
router.put('/updatedetails',protect, updateDetails);



module.exports = router;