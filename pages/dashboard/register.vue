<template>
    <div class="container">
        <el-container class="innerContainer">
            <Logo class="logo" :img-height="175" :img-width="175" :text-size="75" />
            <el-container class="container-card">
                <el-card class="login-card">
                    <el-form ref="loginForm" :model="formData" status-icon hide-required-asterisk>
                        <el-form-item label="Email:" prop="email" label-width="140px">
                            <el-input
                                v-model="formData.email"
                                class="email"
                                type="email"
                                placeholder="e.g. example@email.com" />
                        </el-form-item>
                        <el-form-item label="Password:" prop="password" label-width="140px">
                            <el-input
                                v-model="formData.password"
                                class="password"
                                type="password"
                                placeholder="Password" />
                        </el-form-item>
                        <el-form-item label="Confirm Password:" prop="confirmPassword" label-width="140px">
                            <el-input
                                v-model="formData.confirmPassword"
                                class="confirm-password"
                                type="password"
                                placeholder="Confirm Password" />
                        </el-form-item>
                        <el-form-item class="actions">
                            <el-button class="register" type="primary" @click="warning" plain>
                                <fa-icon :style="{ 'margin-right': '5px' }" :icon="['fas', 'user-pen']"/>
                                Register
                            </el-button>
                            <el-button class="back" @click="$router.back()" plain>
                                <fa-icon :style="{ 'margin-right': '5px' }" :icon="['fas', 'chevron-left']"/>
                                Back
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import Logo from "~/components/Logo.vue";

definePageMeta({
    title: "Register",
    layout: "default"
});

useSeoMeta({
    title: "Register",
    description: "Register for an account on the site.",
});

const formData = reactive({
    email: "",
    password: "",
    confirmPassword: ""
});

function warning(): void {
    ElMessageBox.confirm("Register is currently unavailable", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
        customClass: "custom-message-box",
        customStyle: {
            borderRadius: "20px"
        }
    }).then(() => {
        ElMessage({
            type: "success",
            message: "Successfully acknowledged warning."
        });
    });
}
</script>

<style lang="scss">
.custom-message-box {
    button {
        height: 35px;
        width: 90px;
        border-radius: 50px;
    }
}

.email,
.password,
.confirm-password {
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
                width: 750px;
                padding: 20px;
                border-radius: 20px;
                align-self: center;

                .actions {
                    .register, .back {
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
