import express from 'express';
import { limitadorLogin } from '../middlewares/limitadorLogin.js';
import { login, logout, refresh } from '../controllers/authController.js';


const router = express.Router()

router.post('/login', limitadorLogin, login)
router.post('/refresh', refresh)
router.post('/logout', logout)

export default router