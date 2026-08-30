import { Router } from 'express';
import * as ctrl from '../controllers/librosController';
import { validate } from '../middlewares/validate';
import { validateParams } from '../middlewares/validateParams';
import { libroCreateSchema, libroUpdateSchema } from '../validations/libro';

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', validateParams, ctrl.getOne);
router.post('/', validate(libroCreateSchema), ctrl.create);
router.put('/:id', validateParams, validate(libroUpdateSchema), ctrl.update);
router.delete('/:id', validateParams, ctrl.remove);

export default router;
