import { type Document, Schema, model } from "mongoose";

import type { User, UserData } from "~~/types/user";


type UserModel = UserData & Document & {
    cleanUser(): User
};

const UserSchema = new Schema<UserModel>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
    role: { type: Number, required: true, min: 0, max: 2, default: 2 },
    createdAt: { type: Date, required: true }
});

UserSchema.methods.cleanUser = function (): User {
    return {
        id: this._id,
        email: this.email,
        username: this.username,
        token: this.token,
        role: this.role,
        createdAt: this.createdAt
    };
};

export const Users = model<UserModel>("Users", UserSchema);
