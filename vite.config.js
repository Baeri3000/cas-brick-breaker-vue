import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        manifest: true,
    },
    plugins: [
        vue(),
        VitePWA({
            devOptions: {
                enabled: true,
                type: 'module',
            },
            registerType: 'autoUpdate',
            manifest: {
                short_name: "cas_brick_breaker_vue",
                name: "CAS Brick Breake Vue PWA",
                start_url: "https://cas-brick-breaker-vue.web.app",
                background_color: "#333333",
                theme_color: "#333333",
                display: "standalone",
                scope: "https://cas-brick-breaker-vue.web.app",
                icons: [{
                    src: "/img/icons/brick-breaker.png",
                    sizes: "512x512",
                    type: "image/png"
                }, {
                    src: "/img/icons/android-chrome-512x512.png",
                    sizes: "512x512",
                    type: "image/png"
                }, {
                    src: "/img/icons/maskable_icon.png",
                    sizes: "144x144",
                    type: "image/png",
                    purpose: "maskable"
                }]
            },
            includeManifestIcons: true,
            includeAssets: ['./img/icons/*.png']
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
})
