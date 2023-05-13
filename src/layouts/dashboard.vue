<template>
    <main>
        <SideNav />
        <div class="content">
            <router-view />
        </div>
    </main>
</template>

<script setup lang="ts">
import SideNav from "~/components/SideNav.vue";
</script>

<style lang="scss" scoped>

</style>
