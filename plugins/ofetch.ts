import { ofetch } from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  globalThis.$fetch = ofetch.create({
    baseURL: config.public.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Accept: "*/*",
    },
    onRequest({ request, options }) {
      let token = authStore.user.token;
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}` 
        }
      } else {
        // console.log('Not authenticated')
      }
    },
    onRequestError ({ error }) {
      console.log(error);
      return Promise.reject(error);
    },
    onResponse({request, options, response}) {
      if (response._data?.statusCode === 401) {
        authStore.clearData();
        navigateTo("/login");
      }
    },
    onResponseError({ request, response, options }) {
      const status = response.status;
      console.log(status);
      if (status === 401) {
        authStore.clearData();
        navigateTo("/login");
      } else if (status == 500) {
        // router.push("/error/500");;
      }
      console.log("fetch response error: ", status, response.body);
    }
  })
})