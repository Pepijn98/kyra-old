<template>
    <div :style="{ 'height': `${imgHeight}px` }" class="logo">
        <img :height="imgHeight" :width="imgWidth" :src="logo" alt="logo" />
        <p :style="{ 'font-size': `${textSize}px` }">Kyra</p>
    </div>
</template>

<script setup lang="ts">
import logo from "~/assets/logo.png?url";

defineProps<{
    imgHeight: number;
    imgWidth: number;
    textSize: number;
}>();
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    justify-content: center;
    margin-top: 15px;

    p {
        align-self: center;
    }
}
</style>
