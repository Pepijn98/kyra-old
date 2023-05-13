import { defineStore } from "pinia";

import { User } from "~/types/User";

type UserState = { user: User | null }

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        user: null
    }),
    actions: {
        addUser(user: User) {
            this.user = user;
        },
        removeUser() {
            this.user = null;
        }
    }
});
