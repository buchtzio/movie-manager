import { Router } from 'express';
import { getAllMovies, searchMovies } from '../controllers/movieController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getAllMovies);
router.get('/search', authenticate, searchMovies);

export default router;