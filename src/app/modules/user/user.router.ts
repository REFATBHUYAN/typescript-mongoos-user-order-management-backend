import express from 'express';
import { UserControler } from './user.controler';

const router = express.Router();

router.get('/users', UserControler.allUser);
router.post('/users', UserControler.createUser);

export const UserRouter = router;