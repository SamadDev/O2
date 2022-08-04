const express = require('express');
const { register, login, getMe,updateDetails,logout ,getUsers,updatePassword} = require('../Controler/AuthController');

const router = express.Router();

const {protect}= require('../Midlware/AuthMidleware');

router.post('/register', register);
router.post('/login', login);
router.put('/updatePassword',protect,updatePassword);
router.get('/logout',protect,logout);
router.get('/me',protect,getMe);
router.get('/getUsers',getUsers);
router.put('/updatedetails',protect,updateDetails);



module.exports = router;