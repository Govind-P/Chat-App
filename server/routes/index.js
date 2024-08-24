import express from 'express';
import {register} from '../controller/register.js';
import { Login } from '../controller/login.js';
import { Logout } from '../controller/logout.js';
import { authSender, authToken } from '../middleware/auth.js';
import { userData } from '../controller/userData.js';
import { usersDetails } from '../controller/usersDetails.js';

const router=express.Router();

router.post('/register',register);
router.post('/login',Login);
router.get('/user-data',authToken,userData)
router.get('/logout',authToken,Logout);
router.get('/users/:id',authSender,usersDetails)

export default router;