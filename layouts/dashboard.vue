<template>
    <el-container>
        <el-header v-if="isMobile"></el-header>
        <el-container>
            <el-aside v-if="!isMobile" width="360px" style="overflow: visible;">
                <SideNav />
            </el-aside>
            <el-main>
                <slot />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import { breakpointsSematic } from "@vueuse/core";

const breakpoints = useBreakpoints(breakpointsSematic);
const isMobile = breakpoints.smallerOrEqual("mobileL");
</script>
