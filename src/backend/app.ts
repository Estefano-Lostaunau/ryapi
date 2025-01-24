import express from 'express';
import { authMiddleware } from './middleware/auth.middleware';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(authMiddleware); // Apply globally
app.use('/api', routes);

export default app;