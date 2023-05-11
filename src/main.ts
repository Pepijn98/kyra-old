import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

import type { UserModule } from './types'

import './style.css'

const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(
    App,
    { routes, base: import.meta.env.BASE_URL },
    (ctx) => {
        Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })).forEach((module) => module.install(ctx))
    }
)
