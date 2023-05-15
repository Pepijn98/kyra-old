<template>
    <div>
        <h1>Profile</h1>
        <p v-if="userStore.isLoggedIn">Logged in as {{ userStore.user!.username }}</p>
        <button :disabled="!userStore.isLoggedIn" @click="logout">Logout</button>
    </div>
</template>

<script setup lang="ts">
const router = useRouter();
const userStore = useUserStore();

if (!userStore.isLoggedIn) {
    router.push("/dashboard/login");
}

function logout(): void {
    userStore.removeUser();

    router.push("/dashboard/login");
}
</script>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  title: Profile
  layout: dashboard
</route>
