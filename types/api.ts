import { User } from "~/types/user";

export type FetchError = {
    statusCode: number
    statusMessage: string
    message: string
}

export type LoginResponse = {
    statusCode: number;
    statusMessage: string;
    message: string;
    user: User;
}
