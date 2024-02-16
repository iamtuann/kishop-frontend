import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig> {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (from.params.detailId && to.params.detailId !== from.params.detailId) {
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