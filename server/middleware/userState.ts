export default defineEventHandler(async (event) => {
    console.log("userState middleware");
    event.context.auth = {
        isLoggedIn: false,
    };
});
