import express from 'express';
const router = express.Router();

// middleware
import catchAsync from '../utils/catchAsync.js';

// controller
import { signup } from '../controllers/users.js';

router.route('/')
    .post(catchAsync(signup));

export default router;