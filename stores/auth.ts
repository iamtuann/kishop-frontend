import { defineStore } from 'pinia';
import { IResponse } from '~/types';

export type authStoreType = {
  user: authResponse,
  isAuthenticated: boolean
}

export type authResponse = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  token: string,
  roles: string[]
}

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: {},
    isAuthenticated: false,
  } as authStoreType),
  getters: {
  },
  actions: {
    async login(email: string, password: string) {
      const response: IResponse<authResponse> = await $fetch("auth/login", {
        method: 'POST',
        body: {
          email: email,
          password: password
        }
      });
      if (response.statusCode === 200) {
        this.user = response.output;
        this.isAuthenticated = true;
      }
      return response;
    }
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      maxAge: 86400000,
    }),
  },
})