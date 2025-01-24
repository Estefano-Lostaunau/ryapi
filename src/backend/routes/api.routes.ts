import { Router } from 'express';
import { ApiController } from '../controllers/api.controller';

const router = Router();
const controller = new ApiController();

router.post('/', (req, res) => controller.create(req, res));
router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));
router.get('/user/:userId', (req, res) => controller.findByUserId(req, res));

export default router;