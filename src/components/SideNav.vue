<template>
    <div class="sidenav">
        <Logo :imgHeight="125" :imgWidth="125" :textSize="48" />
    </div>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";
</script>

<style lang="scss" scoped>
.sidenav {
    width: var(--sidenav-width);
    height: 100%;

    background-color: var(--secondary-button);
    border-radius: 0 20px 20px 0;
}
</style>
