import { Router } from 'express';
import * as ctrl from '../controllers/autoresController';
import { validate } from '../middlewares/validate';
import { validateParams } from '../middlewares/validateParams';
import { autorCreateSchema, autorUpdateSchema } from '../validations/autor';

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', validateParams, ctrl.getOne);
router.post('/', validate(autorCreateSchema), ctrl.create);
router.put('/:id', validateParams, validate(autorUpdateSchema), ctrl.update);
router.delete('/:id', validateParams, ctrl.remove);

export default router;
