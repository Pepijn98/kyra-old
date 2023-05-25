import { User } from "~/types/user";

type UserState = { user: User | null }

export const useUserStore = defineStore("user", {
    state: (): UserState => {
        return {
            user: null
        };
    },
    getters: {
        isLoggedIn: (state) => state.user !== null,
    },
    actions: {
        addUser(user: User) {
            this.user = user;
        },
        removeUser() {
            this.user = null;
        },
        updateToken(token: string) {
            if (this.user) {
                this.user.token = token;
            }
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
