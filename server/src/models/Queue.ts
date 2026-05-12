import mongoose, { Schema, Document } from 'mongoose';

export interface IQueue extends Document {
    name: string;
    birthdate: string; // "MM-DD" format
    creatorName: string;
    wishLinkId: string;
    birthdayLinkId: string;
    dashboardId: string;
    createdAt: Date;
}

const QueueSchema = new Schema<IQueue>({
    name: { type: String, required: true },
    birthdate: { type: String, required: true },
    creatorName: { type: String, required: true },
    wishLinkId: { type: String, required: true, unique: true },
    birthdayLinkId: { type: String, required: true, unique: true },
    dashboardId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IQueue>('Queue', QueueSchema);