import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { logger } from './utils/logger';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';

config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Movie Search API is running',
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(`Unhandled error: ${error.message}`);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

export default app;