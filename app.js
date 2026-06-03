import 'dotenv/config';

import connectDB from './lib/db.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// middleware
import { globalError, invalidRoute } from './middlewares/errorHandler.js';

// router
import authRoute from './routes/authRoute.js';

app.use('/api/auth', authRoute);

// health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        message: 'App is running smoothly.',
        uptime: process.uptime(),
    });
});

// get all error
app.use(invalidRoute);
app.use(globalError);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}/`);
});