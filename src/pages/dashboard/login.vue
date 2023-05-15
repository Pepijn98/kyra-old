<template>
    <div>
        <h1>Login</h1>
        <button :disabled="userStore.isLoggedIn" @click="login">Login</button>
    </div>
</template>

<script setup lang="ts">
const router = useRouter();
const userStore = useUserStore();

if (userStore.isLoggedIn) {
    router.push(`/dashboard/${userStore.user!.id}/profile`);
}

function login(): void {
    userStore.addUser({
        id: "123456789123456789",
        email: "pepijn@vdbroek.dev",
        username: "pepijn98",
        token: "dshf8943yf980hf439h34gh98y43g908yh943hg0987hgf03g4398",
        role: 0,
        createdAt: new Date(),
    });

    router.push(`/dashboard/${userStore.user!.id}/profile`);
}
</script>

<style lang="scss" scoped>

</style>

<route lang="yaml">
meta:
  title: Login
  layout: default
</route>
