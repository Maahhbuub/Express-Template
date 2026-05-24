import 'dotenv/config';

import connectDB from './lib/db.js';
import express from 'express';

const PORT = 5000;
const app = express();
app.use(express.json());

// middleware
import { globalError, invalidRoute } from './middlewares/errorHandler.js';

// router
import usersRoute from './routes/users.js';

app.use('/users', usersRoute);

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
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}/`);
});