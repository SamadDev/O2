const express = require('express');
const { register, login, getMe,updateDetails,logout ,getUsers} = require('../Controler/AuthController');

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/logout',logout)
router.get('/me',getMe);
router.get('/getUsers',getUsers);
router.put('/updatedetails', updateDetails);



module.exports = router;