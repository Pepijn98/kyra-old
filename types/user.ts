import { type ObjectValues } from "./general";

export const Role = {
    OWNER: 0,
    ADMIN: 1,
    USER: 2
} as const;

export type RoleLevel = ObjectValues<typeof Role>

export type UserData = {
    email: string
    username: string
    password: string
    token: string
    role: RoleLevel
    createdAt: Date
}

export type PublicUser = Omit<UserData, "email" | "password" | "token"> & { id: string }

export type User = Omit<UserData, "password"> & { id: string }
