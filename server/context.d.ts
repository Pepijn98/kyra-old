import { UserState } from "~/types/user";

export {};
declare module "h3" {
    interface H3EventContext {
        auth: UserState;
    }
}
