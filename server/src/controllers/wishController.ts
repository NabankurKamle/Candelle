import { Request, Response } from 'express';
import Wish from '../models/Wish';
import Queue from '../models/Queue';

export const createWish = async (req: Request, res: Response) => {
    try {
        const { wishLinkId } = req.params;
        const queue = await Queue.findOne({ wishLinkId });
        if (!queue) return res.status(404).json({ error: 'Queue not found' });

        const { senderName, message, attachedLink, drawingData } = req.body;
        const attachmentPath = req.file
            ? `/uploads/${req.file.filename}`
            : undefined;

        const wish = await Wish.create({
            queueId: queue._id,
            senderName,
            message,
            attachedLink,
            drawingData,
            attachmentPath,
        });
        res.status(201).json(wish);
    } catch (err) {
        res.status(500).json({ error: 'Failed to post wish' });
    }
};

export const getWishesByQueue = async (req: Request, res: Response) => {
    try {
        const { queueId } = req.params;
        const wishes = await Wish.find({ queueId }).sort({ createdAt: -1 });
        res.json(wishes);
    } catch {
        res.status(500).json({ error: 'Failed to fetch wishes' });
    }
};

export const deleteWish = async (req: Request, res: Response) => {
    try {
        await Wish.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: 'Delete failed' });
    }
};

export const updateWish = async (req: Request, res: Response) => {
    try {
        const wish = await Wish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(wish);
    } catch {
        res.status(500).json({ error: 'Update failed' });
    }
};