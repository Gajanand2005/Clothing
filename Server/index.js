import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';    
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './route/userroute.js';
import categoryRouter from './route/categoryroute.js';
import productRouter from './route/productroute.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet({
    crossOriginResourcePolicy: false
}));

const PORT  = 8080 || process.env.PORT 

app.get("/", (req, res) => {
    res.json({
        message: `Server is running on port ${process.env.PORT}`
    });
});  
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);

// Connect DB and start server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("✅ Server is running on port", process.env.PORT);
    });
});