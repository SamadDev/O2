import { Router } from 'express';
import { register, login, getMe, updateDetails, logout, getUsers } from '../Controler/AuthController';

const router = Router();


router.post('/register', register);
router.post('/login', login);
router.get('/logout',logout)
router.get('/me',getMe);
router.get('/getUsers',getUsers);
router.put('/updatedetails', updateDetails);



export default router;