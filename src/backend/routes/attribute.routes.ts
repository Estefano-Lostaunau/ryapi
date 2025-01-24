import { Router } from 'express';
import { AttributeController } from '../controllers/attribute.controller';

const router = Router();
const controller = new AttributeController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));
router.get('/table/:tableId', (req, res) => controller.findByTableId(req, res));

export default router;