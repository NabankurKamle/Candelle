import { Router } from 'express';
import { upload } from '../middleware/upload';
import {
    createWish,
    getWishesByQueue,
    deleteWish,
    updateWish,
} from '../controllers/wishController';

const router = Router();

router.post('/:wishLinkId', upload.single('attachment'), createWish);
router.get('/queue/:queueId', getWishesByQueue);
router.delete('/:id', deleteWish);
router.put('/:id', updateWish);

export default router;