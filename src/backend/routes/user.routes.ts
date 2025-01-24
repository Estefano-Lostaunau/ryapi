import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const controller = new UserController();

router.post('/register', (req, res) => controller.register(req, res));
router.post('/login', (req, res) => controller.login(req, res));
router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));
router.put('/:id', (req, res) => controller.update(req, res));
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router;