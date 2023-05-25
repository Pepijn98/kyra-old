<template>
    <div class="sidenav">
        <Logo />
        <div class="sidenav-actions">
            <SideNavButton
                :icon="['fas', 'user']"
                :active="route.path.endsWith('/profile')">Profile</SideNavButton>

            <SideNavButton
                :icon="['fas', 'images']"
                :active="route.path.endsWith('/images')">Images</SideNavButton>

            <SideNavButton
                :icon="['fas', 'file']"
                :active="route.path.endsWith('/documents')">Documents</SideNavButton>

            <el-divider :style="{ 'width': '250px', 'margin-right': 'auto', 'margin-left': 'auto' }" />

            <SideNavButton
                :icon="['fas', 'gear']"
                :active="route.path.endsWith('/settings')">Settings</SideNavButton>

            <SideNavButton
                :icon="['fas', 'right-from-bracket']"
                @click="logout">Logout</SideNavButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from "~/components/Logo.vue";
import SideNavButton from "~/components/SideNavButton.vue";
import { useUserStore } from "~/stores/user";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

function logout(): void {
    userStore.removeUser();
    router.push("/dashboard/login");
}
</script>

<style lang="scss" scoped>
.sidenav {
    height: 100%;
    background-color: var(--sidenav-bg-color);
    box-shadow: var(--el-box-shadow-light);
    border-radius: 0 20px 20px 0;
    display: flex;
    flex-direction: column;

    .sidenav-actions {
        margin: auto 0 auto 0;

        > :not(:first-child) {
            margin-top: 25px;
        }
    }
}
</style>
