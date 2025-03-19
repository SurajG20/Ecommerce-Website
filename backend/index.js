import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/config.js';
import { connectDB } from './config/database.js';
import errorHandler from './middlewares/error-handler.js';
import notFoundMiddleware from './middlewares/not-found.js';
import { initModels } from './models/associations.js';
import { runSeeders } from './models/seeders.js';
import mainRoutes from './routes/main.routes.js';

dotenv.config();

const app = express();

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.RATE_LIMIT || 100,
  message: {
    status: 429,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(helmet());
app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(morgan('dev'));

app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith('/api/v1/stripe/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

let isConnected = false;

const connectWithRetry = async () => {
  if (isConnected) return;

  try {
    await connectDB();
    isConnected = true;
    console.log('Database connected successfully');

    if (process.env.NODE_ENV !== 'production') {
      initModels();
      await runSeeders();
    }
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

app.use(async (req, res, next) => {
  await connectWithRetry();
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    database: isConnected ? 'connected' : 'disconnected',
  });
});

app.use('/api/v1', mainRoutes);

app.use(notFoundMiddleware);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  const startServer = async () => {
    try {
      await connectWithRetry();
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  startServer();
}

export default app;
