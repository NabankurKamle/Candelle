import axios from 'axios';

const BASE =
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5000/api';

export const api = {
    createQueue: (data: { name: string; birthdate: string; creatorName: string }) =>
        axios.post(`${BASE}/queues`, data).then(r => r.data),

    getQueueByWishLink: (id: string) =>
        axios.get(`${BASE}/queues/wish/${id}`).then(r => r.data),

    getQueueByBirthdayLink: (id: string) =>
        axios.get(`${BASE}/queues/birthday/${id}`).then(r => r.data),

    getQueueByDashboard: (id: string) =>
        axios.get(`${BASE}/queues/dashboard/${id}`).then(r => r.data),

    updateQueue: (id: string, data: object) =>
        axios.put(`${BASE}/queues/dashboard/${id}`, data).then(r => r.data),

    deleteQueue: (id: string) =>
        axios.delete(`${BASE}/queues/dashboard/${id}`).then(r => r.data),

    postWish: (wishLinkId: string, formData: FormData) =>
        axios.post(`${BASE}/wishes/${wishLinkId}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(r => r.data),

    getWishes: (queueId: string) =>
        axios.get(`${BASE}/wishes/queue/${queueId}`).then(r => r.data),

    deleteWish: (id: string) =>
        axios.delete(`${BASE}/wishes/${id}`).then(r => r.data),

    updateWish: (id: string, data: object) =>
        axios.put(`${BASE}/wishes/${id}`, data).then(r => r.data),
};