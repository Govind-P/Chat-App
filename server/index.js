import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import allRoutes from './routes/index.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', allRoutes);


const Port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(Port, () => console.log(`Server running on port ${Port}`));
}).catch((error) => console.error(error.message));