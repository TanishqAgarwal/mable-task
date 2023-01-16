import { Router } from 'express';
import handleUser from '../controllers/userController';

const router = Router();

router.post('/', handleUser);

export default router;