import express from 'express';
import { limitadorLogin } from '../middlewares/limitadorLogin.js';
import { login } from '../controllers/authController.js';


const router = express.Router()

router.post('/login', limitadorLogin, login)

export default router