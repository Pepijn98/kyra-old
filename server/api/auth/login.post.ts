import * as bcrypt from "bcrypt";
import { z } from "zod";

import { Users } from "../../models/User.model";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const loginValidation = await LoginSchema.safeParseAsync(body);
    if (!loginValidation.success) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid body"
        });
    }

    const { email, password } = loginValidation.data;

    const user = await Users.findOne({ email }).exec();
    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: "No user found with that email"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid password"
        });
    }

    return {
        statusCode: 200,
        statusMessage: "Successfully logged in",
        user: user.cleanUser()
    };
});
