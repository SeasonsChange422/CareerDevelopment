/*
 * @Author: Dhx
 * @Date: 2024-04-26 16:22:48
 * @Description: 
 * @FilePath: \CareerDevelopment\src\plugins\index.ts
 */
/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
  app
    .use(router)
    .use(pinia)
    .use(vuetify)


}
