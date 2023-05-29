import { H3Event } from "h3";
import * as jwt from "jsonwebtoken";

import { Users } from "~/server/models/User.model";
import { RuntimeConfig } from "~/types/general";

//! Not sure if I want to return the User or modify the event context

export default async function useAuth(event: H3Event): Promise<void> {
    console.log("auth plugin");
    // console.log("---------------");
    // console.log(event.path);
    // console.log(event.node.req.url);
    // console.log("---------------");

    const token = getHeader(event, "Authorization");
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: "No token provided",
        });
    }

    const config: RuntimeConfig = useRuntimeConfig();

    try {
        jwt.verify(token, config.auth.secret);
    } catch (err) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid token",
        });
    }

    const user = await Users.findOne({ token }).exec();
    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: "User not found",
        });
    }

    event.context.auth = {
        isLoggedIn: true,
        user: user.cleanUser(),
    };
}
