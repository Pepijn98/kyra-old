import ky from "ky";

import { type UserResponse, type ErrorResponse, handleError } from "~/api/ApiService";

type AuthApiService = {
    login: (email: string, password: string) => Promise<UserResponse | ErrorResponse>
    me(token: string): Promise<UserResponse | ErrorResponse>
}

export default function(): AuthApiService {
    const baseUrl = `${import.meta.env.VITE_API_HOST}/api/auth`;

    const http = ky.create({
        prefixUrl: baseUrl,
    });

    return {
        async login(email: string, password: string): Promise<UserResponse | ErrorResponse> {
            try {
                return await http.post("login", { json: { email, password } }).json<UserResponse>();
            } catch (error) {
                return await handleError(error);
            }
        },
        async me(): Promise<UserResponse | ErrorResponse> {
            const store = useUserStore();
            if (!store.isLoggedIn || !store.user) {
                return {
                    statusCode: 401,
                    statusMessage: "Unauthorized",
                    message: "You are not logged in"
                };
            }

            try {
                return await http.get("me", { headers: { Authorization: store.user.token } }).json<UserResponse>();
            } catch (error) {
                return await handleError(error);
            }
        }
    };
}
