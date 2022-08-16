import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        secondary: colors.grey.lighten5,
        greyout: colors.grey.darken1,
        accent: colors.grey.darken1,
        cancel: colors.red.darken1
      },
      dark: {
        primary: colors.grey.darken1
      }
    },
    options: {
      customProperties: true
    }
  }
});
