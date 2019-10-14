const registerComponents = (Vue) => {
  Vue.component('c-img', () => import('./vue-image'))
}

export default registerComponents
