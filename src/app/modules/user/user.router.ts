import express from 'express';
import { UserControler } from './user.controler';

const router = express.Router();

router.get('/users', UserControler.allUser);
router.post('/users', UserControler.createUser);
router.get('/users/:userId', UserControler.getSingleUser);
router.put('/users/:userId', UserControler.updateSingleUser);
router.delete('/users/:userId', UserControler.deleteSingleUser);
router.put('/users/:userId/orders', UserControler.putSingleOrder);
router.get('/users/:userId/orders', UserControler.getSingleUserOrder);
router.get('/users/:userId/orders/total-price', UserControler.getSingleUserOrderSum);

export const UserRouter = router;