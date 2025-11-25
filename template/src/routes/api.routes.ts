import { Router } from 'express';
import { authLogin } from '../app/controllers/auth.controller';

const router = Router();

router.post('/login', authLogin);

export default router;
