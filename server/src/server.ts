import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import queueRoutes from './routes/queueRoutes';
import wishRoutes from './routes/wishRoutes';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

/* =========================
   CORS
========================= */

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://candelle.vercel.app',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json({ limit: '20mb' }));

app.use(
    '/uploads',
    express.static(path.join(__dirname, '../uploads'))
);

/* =========================
   HEALTH CHECK
========================= */

app.get('/', (_, res) => {
    res.send('Candelle API running 🎂');
});

/* =========================
   ROUTES
========================= */

app.use('/api/queues', queueRoutes);
app.use('/api/wishes', wishRoutes);

/* =========================
   DB
========================= */

mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => {
        console.log('✅ MongoDB connected');

        app.listen(PORT, () => {
            console.log(`🎂 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB error:', err);
    });