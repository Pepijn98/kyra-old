<template>
    <div>
        <h1>Index</h1>
    </div>
</template>

<script setup lang="ts">
// TODO: Create landing page

definePageMeta({
    title: "Index",
    layout: "default"
});

const router = useRouter();

router.push("/dashboard/login");
</script>

<style lang="scss" scoped>

</style>
