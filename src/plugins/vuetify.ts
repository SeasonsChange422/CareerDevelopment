/*
 * @Author: Dhx
 * @Date: 2024-04-26 16:22:48
 * @Description: 
 * @FilePath: \CareerDevelopment\src\plugins\vuetify.ts
 */
/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'light',
  },
})
