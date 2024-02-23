import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (from.params.variantId && to.params.variantId !== from.params.variantId) {
      return savedPosition;
    } else if (to.hash) {
      return { selector: to.hash };
    } else {
      return {
        top: 0,
        behavior: 'smooth'
      };
    }
  }
}