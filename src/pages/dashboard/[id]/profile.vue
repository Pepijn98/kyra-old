<template>
    <div class="container">
        <div class="innerContainer">
            <div class="account">
                <h1 class="title">Account</h1>
                <div class="account-card">
                    <div :style="{ 'min-width': avatarWidth }" class="account-card__picture"></div>
                    <div class="account-card__content">
                        <h2>{{ userStore.user!.username }}</h2>
                        <p>{{ userStore.user!.email }}</p>
                        <p>{{ createdAt }}</p>
                        <div class="flex-wrap">
                            <el-button class="btn-edit" @click="logout">Edit</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="api">
                <h1 class="title">Api</h1>
                <div class="api-card">
                    <div class="api-card__content">
                        <p class="warning">Your token is very sensitive data, treat it as if it is your password. If anyone has access to your token they can upload, delete and manage your entire account.</p>
                        <p><b>Your token:</b> {{ userStore.user!.token }}</p>
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
const router = useRouter();
const userStore = useUserStore();
const isDark = useDark({
    valueDark: "dark",
    valueLight: "light",
});
const toggleDark = useToggle(isDark);
const avatarWidth = ref("0px");

const createdAt = computed(() => {
    const date = new Date(userStore.user!.createdAt);
    return date.toUTCString();
});

if (!userStore.isLoggedIn) {
    router.push("/dashboard/login");
}

function logout(): void {
    userStore.removeUser();

    router.push("/dashboard/login");
}

function reset(): void {
    toggleDark();
}

onMounted(() => {
    const picture = document.querySelector<HTMLDivElement>(".account-card__picture");
    if (picture) {
        avatarWidth.value = `${picture.offsetHeight}px`;
    }
});
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .innerContainer {
        height: fit-content;
        width: fit-content;
    }
}

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
        background-color: var(--el-bg-color-overlay);
        border-radius: 20px;
        padding: 15px;

        &__picture {
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
        background-color: var(--el-bg-color-overlay);
        border-radius: 20px;
        padding: 15px;

        &__content {
            display: flex;
            flex-direction: column;

            .warning {
                margin-bottom: 15px;
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
</style>

<route lang="yaml">
meta:
  title: Profile
  layout: dashboard
</route>
