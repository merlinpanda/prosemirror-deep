// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import Theme from 'vitepress/theme'
import '@arco-design/web-vue/dist/arco.less';
import './style.less'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.use(ArcoVue)
  }
}
