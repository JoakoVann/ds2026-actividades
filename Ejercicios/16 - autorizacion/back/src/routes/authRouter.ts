import { Router } from 'express';
import * as ctrl from '../controllers/authController';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate';
import { loginSchema, registroSchema } from '../validations/auth.validation';

const router = Router();

router.post('/registro', validate(registroSchema), ctrl.registrar);
router.post('/login', validate(loginSchema), ctrl.login);
router.get('/yo', authenticate, ctrl.yo);

export default router;