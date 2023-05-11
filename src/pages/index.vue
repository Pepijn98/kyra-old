<script lang="tsx">
import { defineComponent } from "vue";

import vueSvg from "~/assets/vue.svg?url";
import HelloWorld from "~/components/HelloWorld.vue";

export default defineComponent({
    render() {
        return (
            <>
                <div>
                    <a href="https://vitejs.dev" target="_blank">
                        <img src="/vite.svg" class="logo" alt="Vite logo" />
                    </a>
                    <a href="https://vuejs.org/" target="_blank">
                        <img src={vueSvg} class="logo vue" alt="Vue logo" />
                    </a>
                </div>
                <HelloWorld msg="Vite + Vue" />
            </>
        );
    }
});
</script>

<style lang="css" scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
