import express from 'express';
import {register} from '../controller/register.js';
import { Login } from '../controller/login.js';
import { Logout } from '../controller/logout.js';
import { authToken } from '../middleware/auth.js';
import { userData } from '../controller/userData.js';

const router=express.Router();

router.post('/register',register);
router.post('/login',Login);
router.get('/user-data',authToken,userData)
router.get('/logout',authToken,Logout);

export default router;