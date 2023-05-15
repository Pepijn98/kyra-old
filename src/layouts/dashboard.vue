<template>
    <main>
        <SideNav />
        <div :style="{ 'width': `${contentWidth}px` }" class="content">
            <router-view />
        </div>
    </main>
</template>

<script setup lang="ts">
import SideNav from "~/components/SideNav.vue";

const contentWidth = ref(0);

onMounted(() => {
    const sidenav = document.querySelector<HTMLDivElement>(".sidenav");
    if (sidenav) {
        contentWidth.value = window.innerWidth - sidenav.offsetWidth;
    }
});
</script>

<style lang="scss" scoped>
main {
    display: flex;
}
</style>
