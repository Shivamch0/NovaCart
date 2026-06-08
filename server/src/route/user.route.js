import express from 'express';
import { registerUser , loginUser } from '../controller/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router