import { AuthApiService, FileApiService, ImageApiService, UserApiService } from "~/api";

type ApiService = {
    auth: AuthApiService
    file?: FileApiService
    image?: ImageApiService
    user?: UserApiService
}

export function useApi(): ApiService {
    const store = useUserStore();

    return {
        auth: new AuthApiService(store.user?.token),
        file: store.user && store.isLoggedIn ? new FileApiService(store.user.token) : undefined,
        image: store.user && store.isLoggedIn ? new ImageApiService(store.user.token) : undefined,
        user: store.user && store.isLoggedIn ? new UserApiService(store.user.token) : undefined
    };
}
