export interface Queue {
    _id: string;
    name: string;
    birthdate: string;
    creatorName: string;
    wishLinkId: string;
    birthdayLinkId: string;
    dashboardId: string;
    createdAt: string;
}

export interface Wish {
    _id: string;
    queueId: string;
    senderName: string;
    message: string;
    attachedLink?: string;
    drawingData?: string;
    attachmentPath?: string;
    createdAt: string;
}