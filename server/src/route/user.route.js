import express from 'express';
import { registerUser , loginUser , logoutUser , currentUser , refreshAccessToken } from '../controller/user.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh-token").post(refreshAccessToken)

//? Auth routes;

router.route("/logout").post(verifyJWT , logoutUser);
router.route("/current-user").post(verifyJWT , currentUser);

export default router