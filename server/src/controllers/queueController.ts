import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import Queue from '../models/Queue';

export const createQueue = async (req: Request, res: Response) => {
    try {
        const { name, birthdate, creatorName } = req.body;
        console.log(req.body);

        const queue = await Queue.create({
            name,
            birthdate,
            creatorName,
            wishLinkId: nanoid(10),
            birthdayLinkId: nanoid(10),
            dashboardId: nanoid(12),
        });
        res.status(201).json(queue);
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: 'Failed to create queue' });
    }
};

export const getQueueByWishLink = async (req: Request, res: Response) => {
    try {
        const queue = await Queue.findOne({ wishLinkId: req.params.id });
        if (!queue) return res.status(404).json({ error: 'Not found' });
        res.json(queue);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getQueueByBirthdayLink = async (req: Request, res: Response) => {
    try {
        const queue = await Queue.findOne({ birthdayLinkId: req.params.id });
        if (!queue) return res.status(404).json({ error: 'Not found' });
        res.json(queue);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getQueueByDashboard = async (req: Request, res: Response) => {
    try {
        const queue = await Queue.findOne({ dashboardId: req.params.id });
        if (!queue) return res.status(404).json({ error: 'Not found' });
        res.json(queue);
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};

export const updateQueue = async (req: Request, res: Response) => {
    try {
        const queue = await Queue.findOneAndUpdate(
            { dashboardId: req.params.id },
            req.body,
            { new: true }
        );
        res.json(queue);
    } catch {
        res.status(500).json({ error: 'Update failed' });
    }
};

export const deleteQueue = async (req: Request, res: Response) => {
    try {
        await Queue.findOneAndDelete({ dashboardId: req.params.id });
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: 'Delete failed' });
    }
};