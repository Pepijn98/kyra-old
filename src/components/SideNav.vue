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
    max-width: 360px;
}
</style>
