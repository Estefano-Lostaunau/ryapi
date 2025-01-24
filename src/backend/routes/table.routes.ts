import { Router } from 'express';
import { TableController } from '../controllers/table.controller';

const router = Router();
const controller = new TableController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));
router.get('/api/:apiId', (req, res) => controller.findByApiId(req, res));

export default router;