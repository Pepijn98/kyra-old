<template>
    <VitePwaManifest />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Buffer } from "buffer";

import { appName } from "~/constants";
import { useUserStore } from "~/stores/user";

useHead({
    title: appName,
});

if (process.client) {
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const setting = localStorage.getItem("vueuse-color-scheme") || "auto";
    if (setting === "dark" || (prefersDark && setting !== "light")) {
        document.documentElement.classList.toggle("dark", true);
    }
}

const user = useUserStore();

onBeforeMount(() => {
    const userState = localStorage.getItem("user");
    if (userState) {
        const savedUser = JSON.parse(Buffer.from(userState, "base64").toString("utf-8"));
        user.addUser(savedUser);
    }
});

watch(
    user.$state,
    (state) => {
        localStorage.setItem("user", Buffer.from(JSON.stringify(state.user)).toString("base64"));
    },
    { deep: true }
);
</script>

<style>
html,
body,
#__nuxt,
#__nuxt>.el-container {
    height: 100vh;
    margin: 0;
    padding: 0;
}
</style>
