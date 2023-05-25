import ky, { HTTPError } from "ky";

import { type User } from "~/types/user";

export type ApiResponse = {
    statusCode: number;
    statusMessage: string;
    message: string;
    data?: Record<string, unknown>;
}

export interface UserResponse extends ApiResponse {
    data: {
        user: User
    }
}

export interface NewTokenResponse extends ApiResponse {
    data: {
        token: string
    }
}

export type ErrorResponse = {
    statusCode: number;
    statusMessage: string;
    message: string;
}

export async function handleError(error: unknown): Promise<ErrorResponse> {
    if (error instanceof HTTPError) {
        return error.response.json();
    }

    // Default error message
    return {
        statusCode: 500,
        statusMessage: "Internal Server Error",
        message: "Something went wrong"
    };
}

export function isApiResponse<T extends ApiResponse>(response: T | ErrorResponse): response is T {
    return response.statusCode >= 200 && response.statusCode < 400;
}

export class ApiService {
    api: typeof ky;
    baseUrl: string;

    constructor(resource: string) {
        this.baseUrl = `${import.meta.env.VITE_API_HOST}/api/${resource}`;
        this.api = ky.create({
            prefixUrl: this.baseUrl,
        });
    }

    async handleError(error: unknown): Promise<ErrorResponse> {
        return handleError(error);
    }
}
