import mongoose, { Schema, Document } from 'mongoose';

export interface IWish extends Document {
    queueId: mongoose.Types.ObjectId;
    senderName: string;
    message: string;
    attachedLink?: string;
    drawingData?: string;   // base64 canvas PNG
    attachmentPath?: string; // uploaded file path
    createdAt: Date;
}

const WishSchema = new Schema<IWish>({
    queueId: { type: Schema.Types.ObjectId, ref: 'Queue', required: true },
    senderName: { type: String, required: true },
    message: { type: String, required: true },
    attachedLink: String,
    drawingData: String,
    attachmentPath: String,
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWish>('Wish', WishSchema);