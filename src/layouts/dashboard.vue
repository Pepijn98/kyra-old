<template>
    <main>
        <SideNav :style="{ 'width': sidenavWidth }" />
        <div :style="{ 'width': contentWidth }" class="content">
            <router-view />
        </div>
    </main>
</template>

<script setup lang="ts">
import SideNav from "~/components/SideNav.vue";

const width = ref(window.innerWidth);
const sidenavWidth = ref("360px");
const contentWidth = ref("");

function closeSidenav(): void {
    const sidenav = document.querySelector<HTMLDivElement>(".sidenav");
    if (!sidenav) {
        return;
    }

    sidenavWidth.value = "0px";
    sidenav.classList.remove("visible");
    sidenav.classList.add("hidden");
}

function openSidenav(): void {
    const sidenav = document.querySelector<HTMLDivElement>(".sidenav");
    if (!sidenav) {
        return;
    }

    sidenav.classList.remove("hidden");
    sidenav.classList.add("visible");
}

function updateWidth(): void {
    const sidenav = document.querySelector<HTMLDivElement>(".sidenav");
    if (!sidenav) {
        return;
    }

    if (width.value > 1200) {
        sidenavWidth.value = "360px";
    } else {
        sidenavWidth.value = "30%";
    }

    contentWidth.value = `${width.value - sidenav.offsetWidth}px`;
}

function updateSidenav(): void {
    if (width.value <= 830) {
        closeSidenav();
    } else {
        openSidenav();
    }
}

onMounted(() => {
    updateWidth();
    updateSidenav();

    window.addEventListener("resize",  () => {
        width.value = window.innerWidth;
        updateWidth();
        updateSidenav();
    });
});
</script>

<style lang="scss" scoped>
main {
    display: flex;
}
</style>
