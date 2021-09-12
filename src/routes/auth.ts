import express from 'express';
import { authController } from '../controllers';

const router = express();

// 리프레쉬 토큰
router.get('/', authController.reToken);
router.get('/healthcheck', authController.healthcheck);
export default router;
