export default defineEventHandler(async (event) => {
    await useAuth(event);

    if (!event.context.auth.isLoggedIn) {
        throw createError({
            statusCode: 401,
            statusMessage: "Not logged in",
        });
    }

    return {
        statusCode: 200,
        statusMessage: "Successfully retrieved user",
        user: event.context.auth.user,
    };
});
