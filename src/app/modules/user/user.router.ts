import express from 'express';
import { UserControler } from './user.controler';

const router = express.Router();

router.get('/users', UserControler.allUser);
router.post('/users', UserControler.createUser);
router.get('/users/:userId', UserControler.getSingleUser);
router.put('/users/:userId', UserControler.updateSingleUser);

export const UserRouter = router;