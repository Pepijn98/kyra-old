<template>
    <div :style="{ 'height': `${imgHeight}px` }" class="logo">
        <img :height="imgHeight" :width="imgWidth" src="~/assets/images/logo.png" alt="logo" />
        <p :style="{ 'font-size': `${textSize}px` }">Kyra</p>
    </div>
</template>

<script setup lang="ts">
const imgHeight = ref(125);
const imgWidth = ref(125);
const textSize = ref(48);
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
