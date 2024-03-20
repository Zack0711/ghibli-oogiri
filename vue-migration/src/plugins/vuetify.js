import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import { VBtn } from 'vuetify/components'

import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi' // This is already the default value - only for display purposes
  },
  defaults: {
    VBtn: {
      variant: 'flat'
    }
  }
})
