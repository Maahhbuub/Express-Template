import express from 'express';
const router = express.Router();

// middleware
import catchAsync from '../utils/catchAsync.js';
import { protect } from '../middlewares/authMiddleware.js';

// controller
import { register, login, refreshAccessToken, getMe, logout, } from '../controllers/authController.js';

// router.route('/')
//     .post(catchAsync(register));

router.get('/me', protect, catchAsync(getMe));

router.post('/register', catchAsync(register));
router.post('/login', catchAsync(login));
router.post('/refresh-token', catchAsync(refreshAccessToken));
router.post('/logout', protect, catchAsync(logout));


export default router;