import express from 'express';
const router = express.Router();

// validation
import { createUserSchema, loginUserSchema } from "../validations/user.validation.js";
import { validateRequest } from "../middlewares/validation.middleware.js";

// middleware
import catchAsync from '../utils/catchAsync.js';
import { protect } from '../middlewares/auth.middleware.js';

// controller
import { register, login, refreshAccessToken, getMe, logout, } from '../controllers/auth.controller.js';

// router.route('/')
//     .post(catchAsync(register));

router.get('/me', protect, catchAsync(getMe));

router.post('/register', validateRequest(createUserSchema), catchAsync(register));
router.post('/login', validateRequest(loginUserSchema), catchAsync(login));
router.post('/refresh-token', catchAsync(refreshAccessToken));
router.post('/logout', protect, catchAsync(logout));


export default router;