<template>
    <div :style="{ 'height': `${imgHeight}px` }" class="logo">
        <img :height="imgHeight" :width="imgWidth" src="~/assets/images/logo.png" alt="logo" />
        <p :style="{ 'font-size': `${textSize}px` }">Kyra</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    imgHeight: {
        type: Number,
        default: 125
    },
    imgWidth: {
        type: Number,
        default: 125
    },
    textSize: {
        type: Number,
        default: 48
    }
});
</script>

<style lang="scss" scoped>
.logo {
    padding-top: 25px;
    display: flex;
    justify-content: center;

    p {
        align-self: center;
        font-weight: bold;
    }
}
</style>
