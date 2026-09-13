import { Router } from 'express';
import * as ctrl from '../controllers/autoresController';
import { validate } from '../middlewares/validate';
import { validateParams } from '../middlewares/validateParams';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { autorCreateSchema, autorUpdateSchema } from '../validations/autor';

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', validateParams, ctrl.getOne);
router.post('/', authenticate, authorize('ADMIN'), validate(autorCreateSchema), ctrl.create);
router.put('/:id', authenticate, authorize('ADMIN'), validateParams, validate(autorUpdateSchema), ctrl.update);
router.delete('/:id', authenticate, authorize('ADMIN'), validateParams, ctrl.remove);

export default router;
