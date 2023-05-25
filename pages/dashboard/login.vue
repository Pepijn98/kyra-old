<template>
    <div class="container">
        <el-container class="innerContainer">
            <Logo class="logo" :img-height="175" :img-width="175" :text-size="75" />
            <el-container class="container-card">
                <el-card class="login-card">
                    <el-form ref="loginForm" :model="formData" :rules="formRules" status-icon hide-required-asterisk>
                        <el-form-item label="Email:" prop="email" label-width="80px">
                            <el-input
                                v-model="formData.email"
                                class="email"
                                type="email"
                                placeholder="e.g. example@email.com" />
                        </el-form-item>
                        <el-form-item label="Password:" prop="password" label-width="80px">
                            <el-input
                                v-model="formData.password"
                                class="password"
                                type="password"
                                placeholder="Password" />
                        </el-form-item>
                        <el-form-item class="actions">
                            <el-button class="login" type="primary" @click="login(loginForm)" plain :loading="loginPending">
                                <fa-icon v-if="!loginPending" :style="{ 'margin-right': '5px' }" :icon="['fas', 'right-to-bracket']"/>
                                {{ loginPending ? "Logging in..." : "Login" }}
                            </el-button>
                            <el-button class="register" @click="goToRegister" plain>
                                <fa-icon :style="{ 'margin-right': '5px' }" :icon="['fas', 'user-pen']"/>
                                Register
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";

import Logo from "~/components/Logo.vue";
import type { FetchError, LoginResponse } from "~/types/api";

type FormFieldError = {
    field: string
    fieldValue: string
    message: string
}

type FormValidationError = {
    email: FormFieldError[]
    password: FormFieldError[]
}

definePageMeta({
    title: "Login",
    layout: "default"
});

useSeoMeta({
    title: "Login",
    description: "Login to your account."
});

const router = useRouter();
const userStore = useUserStore();

const loginForm = ref<FormInstance>();
const loginPending = ref(false);

const formData = reactive({
    email: "",
    password: ""
});

// Form validation rules
const formRules = reactive<FormRules>({
    email: [
        { required: true, message: "Please enter your email address.", trigger: "blur" },
        { type: "email", message: "Please enter a valid email address.", trigger: "blur" }
    ],
    password: [
        { required: true, message: "Please enter your password.", trigger: "blur" },
        { min: 3, message: "Password must be at least 3 characters long.", trigger: "blur" }
    ]
});

if (userStore.isLoggedIn && userStore.user) {
    router.push(`/dashboard/${userStore.user.id}/profile`);
}

function goToRegister(): void {
    router.push("/dashboard/register");
}

async function login(form: FormInstance | undefined): Promise<void> {
    loginPending.value = true;

    if (!form) {
        loginPending.value = false;
        return;
    }

    try {
        // Validate form data
        const result = await form.validate();
        if (!result) {
            ElNotification({
                title: "Invalid form data.",
                type: "error",
                duration: 3000
            });

            loginPending.value = false;
            return;
        }
    } catch (e) {
        // Form validation error
        const error = e as Partial<FormValidationError>;
        ElNotification({
            title: "Invalid form data.",
            message: `Invalid ${Object.keys(error).join(" & ")}`,
            type: "error",
            duration: 3000
        });

        loginPending.value = false;
        return;
    }

    try {
        // Fetch login data
        const data = await $fetch<LoginResponse>("/api/auth/login", {
            method: "POST",
            body: {
                email: formData.email,
                password: formData.password
            }
        });

        loginPending.value = false;

        // Store user data
        userStore.addUser(data.user);
        router.push(`/dashboard/${data.user.id}/profile`);
    } catch (e) {
        // Fetch error
        const error = e as FetchError;
        ElNotification({
            title: `${error.statusCode} ${error.statusMessage}`,
            type: "error",
            duration: 3000
        });
        loginPending.value = false;
    }
}
</script>

<style lang="scss">
.email, .password {
    > div {
        border-radius: 20px;
    }
}

.actions {
    > div {
        justify-content: center;
    }
}
</style>

<style lang="scss" scoped>
.container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .innerContainer {
        flex-direction: column;

        .logo {
            margin-bottom: 20px;
        }

        .container-card {
            padding-left: 10px;
            padding-right: 10px;
            justify-content: center;

            .login-card {
                width: 600px;
                padding: 20px;
                border-radius: 20px;
                align-self: center;

                .actions {
                    .login, .register {
                        height: 50px;
                        width: 180px;
                        border-radius: 50px;
                    }
                }

                .el-form-item:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
