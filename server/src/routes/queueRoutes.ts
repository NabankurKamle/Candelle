import { Router } from 'express';
import {
    createQueue,
    getQueueByWishLink,
    getQueueByBirthdayLink,
    getQueueByDashboard,
    updateQueue,
    deleteQueue,
} from '../controllers/queueController';

const router = Router();

router.post('/', createQueue);
router.get('/wish/:id', getQueueByWishLink);
router.get('/birthday/:id', getQueueByBirthdayLink);
router.get('/dashboard/:id', getQueueByDashboard);
router.put('/dashboard/:id', updateQueue);
router.delete('/dashboard/:id', deleteQueue);

export default router;