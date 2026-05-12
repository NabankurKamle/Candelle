import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);

export const generateSlug = (name: string): string => {
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8);
    return `${cleanName}-${nanoid()}`;
};

export const generateToken = (): string => {
    return customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 32)();
};