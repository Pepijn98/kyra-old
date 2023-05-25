import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { fileURLToPath } from "url";

import { scope, appName, appDescription } from "./constants";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    app: {
        head: {
            title: appName,
            viewport: "width=device-width,initial-scale=1",
            meta: [
                { name: "viewport", content: "width=device-width, initial-scale=1" },
                { name: "description", content: "" },
                { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }
            ],
            script: [],
            link: [
                { rel: "icon", href: "/favicon.ico", sizes: "any" },
                { rel: "icon", type: "image/svg+xml", href: "/nuxt.svg" },
                { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
            ],
            style: [],
            noscript: [
                { children: "JavaScript is required" }
            ]
        }
    },
    alias: {
        "images": fileURLToPath(new URL("./assets/images", import.meta.url)),
        "style": fileURLToPath(new URL("./assets/style", import.meta.url))
    },
    modules: [
        "@vueuse/nuxt",
        "@pinia/nuxt",
        "@vite-pwa/nuxt",
        "@element-plus/nuxt"
    ],
    css: [
        "normalize.css/normalize.css",
        "@fortawesome/fontawesome-svg-core/styles.css",
        "assets/styles/index.scss"
    ],
    sourcemap: {
        server: true,
        client: true
    },
    imports: {
        dirs: ["./stores"],
    },
    pinia: {
        autoImports: ["defineStore", "acceptHMRUpdate"],
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: "@use \"@/assets/styles/element/index.scss\" as element;"
                }
            }
        },
        plugins: [
            AutoImport({
                imports: [
                    "vue",
                    "vue-router",
                    "pinia",
                    "@vueuse/head",
                    "@vueuse/core"
                ],
                dts: "types/auto-imports.d.ts",
                dirs: [
                    "composables",
                    "stores"
                ],
                vueTemplate: true
            }),
            Components({
                extensions: ["vue", "md"],
                include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
                dirs: ["components"],
                dts: "types/components.d.ts"
            })
        ]
    },
    elementPlus: {
        importStyle: "scss",
        themes: ["dark"]
    },
    pwa: {
        registerType: "autoUpdate",
        scope,
        base: scope,
        manifest: {
            id: scope,
            scope,
            name: appName,
            short_name: appName,
            description: appDescription,
            theme_color: "#ffffff",
            icons: [
                {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                },
                {
                    src: "maskable-icon.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any maskable"
                }
            ]
        },
        workbox: {
            globPatterns: ["**/*.{js,css,html,txt,png,ico,svg}"],
            navigateFallbackDenylist: [/^\/api\//],
            navigateFallback: "/",
            cleanupOutdatedCaches: true,
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
                    handler: "CacheFirst",
                    options: {
                        cacheName: "google-fonts-cache",
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                },
                {
                    urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
                    handler: "CacheFirst",
                    options: {
                        cacheName: "gstatic-fonts-cache",
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365
                        },
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                }
            ]
        },
        registerWebManifestInRouteRules: true,
        writePlugin: true,
        devOptions: {
            enabled: import.meta.env.VITE_PLUGIN_PWA === "true",
            navigateFallback: scope
        }
    },
    devtools: {
        enabled: import.meta.env.NODE_ENV !== "production"
    }
});
