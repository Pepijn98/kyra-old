<template>
    <div :style="{ 'height': `${btnHeight}px` }" class="sidenav-action">
        <el-button class="sidenav-button" :style="{ 'height': `${btnHeight}px`, 'width': `${btnWidth}px` }" :type="active ? 'primary' : ''" :plain="active">
            <fa-icon v-if="hasIcon" :style="{ 'margin-right': '10px' }" :icon="icon"/>
            <slot />
        </el-button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    btnHeight: number;
    btnWidth: number;
    textSize?: number;
    icon?: string[];
    active: boolean;
}>();

const hasIcon = computed(() => props.icon !== undefined && props.icon.length >= 2);
</script>

<style lang="scss" scoped>
.sidenav-action {
    width: 100%;
    display: flex;
    justify-content: center;
    // margin-top: 25px;

    .sidenav-button {
        border-radius: 50px;
        font-size: 20px;
    }
}
</style>
