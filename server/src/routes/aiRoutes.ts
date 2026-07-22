import { Router } from 'express';
import { analyzeRequest } from '../controllers/aiController';

const router = Router();

router.post('/analyze', analyzeRequest);

export default router;
