import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().min(3).max(255),
    email: z.string().email(),
    username: z.string().min(3).max(255),
    password: z.string().min(6).max(255),
    token: z.string().max(255),
    role: z.number().min(0).max(2).default(2),
    createdAt: z.date(),
});

export const ImageSchema = z.object({
    name: z.string().min(3).max(255),
    ext: z.string().min(3).max(4),
    hash: z.string().min(3).max(255),
    uploader: z.string().min(3).max(255),
    createdAt: z.date(),
});
