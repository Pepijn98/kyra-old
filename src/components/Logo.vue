<template>
    <div class="logo">
        <img :height="imgHeight" :width="imgWidth" :src="logo" alt="logo" />
        <p style="font-size: {{ textSize }}px;">Kyra</p>
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

</style>
