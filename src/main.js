import Vue from 'vue'
import App from './App.vue'
import router from './router'
import registerComponents from '../packages'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'swiper/dist/css/swiper.css';
import "./assets/index.less"

Vue.use(Antd)

Vue.config.productionTip = false

registerComponents(Vue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
