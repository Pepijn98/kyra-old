import ky, { HTTPError } from "ky";

import { type User } from "~/types/User";

export type ApiResponse = {
    statusCode: number;
    statusMessage: string;
    message: string;
    data?: Record<string, unknown>;
}

export type UserResponse = ApiResponse & {
    data: {
        user: User
    }
}

export type ErrorResponse = {
    statusCode: number;
    statusMessage: string;
    message: string;
}

export class ApiService {
    api: typeof ky;
    baseUrl: string;

    constructor(resource: string) {
        this.baseUrl = `${import.meta.env.VITE_HOST}/api/${resource}`;
        this.api = ky.create({
            prefixUrl: this.baseUrl,
        });
    }

    async handleError(error: unknown): Promise<ErrorResponse> {
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
}
