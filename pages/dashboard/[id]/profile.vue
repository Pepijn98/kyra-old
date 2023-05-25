<template>
    <div class="container">
        <div v-if="!userStore.user" class="innerContainer">
            Loading...
        </div>
        <div v-else class="innerContainer">
            <div class="account">
                <h1 class="title">Account</h1>
                <div class="account-card">
                    <img :style="{ 'min-width': avatarWidth }"
                         src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                         class="account-card__avatar" />
                    <div class="account-card__content">
                        <h2>{{ userStore.user.username }}</h2>
                        <p>{{ userStore.user.email }}</p>
                        <p>{{ createdAt }}</p>
                        <div class="flex-wrap">
                            <el-button class="btn-edit" @click="edit">Edit</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="api">
                <h1 class="title">Api</h1>
                <div class="api-card">
                    <div class="api-card__content">
                        <el-text class="warning" size="large" tag="b">Your token is very sensitive data, treat it as if it is your password. If anyone has access to your token they can upload, delete and manage your entire account.</el-text>
                        <el-text class="token" size="large">
                            <b>Your token: </b>
                            <el-button v-if="!isRevealed" class="reveal-token" @click="isRevealed = true" type="primary" link>reveal token</el-button>
                            <code v-if="isRevealed">{{ userStore.user.token }}</code>
                        </el-text>
                        <div class="flex-wrap">
                            <el-button class="btn-reset" @click="reset">New Token</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElNotification } from "element-plus";

definePageMeta({
    title: "Profile",
    layout: "dashboard"
});

useSeoMeta({
    title: "Profile",
    description: "Manage your account."
});

const router = useRouter();
const userStore = useUserStore();

// Check if user is logged in
if (!userStore.isLoggedIn || !userStore.user) {
    router.push("/dashboard/login");
}

// Get user data
// const resp = await api.auth.me();
// if (isApiResponse(resp)) {
//     userStore.addUser(resp.data.user);
// } else {
//     router.push("/dashboard/login");
//     ElNotification({
//         title: resp.statusMessage,
//         message: resp.message,
//         type: "error",
//         duration: 5000,
//     });
// }

// const isDark = useDark({
//     valueDark: "dark",
//     valueLight: "light",
// });
// const toggleDark = useToggle(isDark);

const isRevealed = ref(false);
const avatarWidth = ref("0px");

const createdAt = computed(() => {
    if (!userStore.user) return null;

    const date = new Date(userStore.user.createdAt);
    return date.toUTCString();
});

function edit(): void {
    ElNotification({
        title: "Coming Soon",
        message: "This feature is coming soon.",
        type: "warning",
        duration: 0,
    });
}

async function reset(): Promise<void> {
    // if (!api.user) return;
    // if (!userStore.user) return;

    // const resp = await api.user.resetToken(userStore.user.id);
    // if (isApiResponse(resp)) {
    //     console.log(resp.data.token);
    //     userStore.updateToken(resp.data.token);
    //     ElNotification({
    //         title: resp.statusMessage,
    //         message: resp.message,
    //         type: "success",
    //         duration: 5000,
    //     });
    //     return;
    // }

    // ElNotification({
    //     title: resp.statusMessage,
    //     message: resp.message,
    //     type: "error",
    //     duration: 5000,
    // });
}

onMounted(() => {
    const picture = document.querySelector<HTMLDivElement>(".account-card__avatar");
    if (picture) {
        avatarWidth.value = `${picture.offsetHeight}px`;
    }
});
</script>

<style lang="scss" scoped>
html.dark {
    .container {
        --el-card-bg-color: var(--el-bg-color-overlay);
    }
}

.container {
    --el-card-border-color: var(--el-border-color-light);
    --el-card-border-radius: 20px;
    --el-card-padding: 15px;
    --el-card-bg-color: var(--el-fill-color-blank);

    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .innerContainer {
        height: fit-content;
        width: fit-content;

        .account {
            height: fit-content;
            margin-bottom: 15px;

            .title {
                width: fit-content;
                margin: 0;
            }

            &-card {
                height: 260px;
                width: 600px;
                display: flex;
                background-color: var(--el-card-bg-color);
                box-shadow: var(--el-box-shadow-light);
                border-radius: var(--el-card-border-radius);
                padding: var(--el-card-padding);

                &__avatar {
                    height: 100%;
                    background-color: var(--el-color-primary);
                    border-radius: 20px;
                }

                &__content {
                    height: 100%;
                    width: 100%;
                    margin-left: 15px;
                    display: flex;
                    flex-direction: column;

                    h2, p {
                        margin: 0;
                    }
                }

                .flex-wrap {
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;

                    .btn-edit {
                        height: 50px;
                        width: 180px;
                        border-radius: 50px;
                    }
                }
            }
        }

        .api {
            height: fit-content;

            .title {
                width: fit-content;
                margin: 0;
            }

            &-card {
                height: 240px;
                width: 900px;
                display: flex;
                background-color: var(--el-card-bg-color);
                box-shadow: var(--el-box-shadow-light);
                border-radius: var(--el-card-border-radius);
                padding: var(--el-card-padding);

                &__content {
                    width: inherit;
                    display: flex;
                    flex-direction: column;

                    .warning {
                        margin-bottom: 15px;
                    }

                    .token {
                        align-self: flex-start;
                    }

                    h2, p {
                        margin: 0;
                    }
                }

                .flex-wrap {
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;

                    .btn-reset {
                        height: 50px;
                        width: 180px;
                        border-radius: 50px;
                    }
                }
            }
        }
    }
}
</style>
