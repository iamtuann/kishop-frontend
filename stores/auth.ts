import { defineStore } from 'pinia';
import { IResponse, AuthResponse, AuthUser } from '~/types';

export type authStoreType = {
  user: AuthResponse,
  isAuthenticated: boolean
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
      const response: IResponse<AuthResponse> = await $fetch("auth/login", {
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
    },
    async register(fullName: string, email: string, password: string) {
      const nameArr = fullName.trim().split(" ");
      const lastName = nameArr.pop() as string;
      const firstName = nameArr.join(' ').trim();
      const response: IResponse<AuthResponse> = await $fetch("auth/signup", {
        method: 'POST',
        body: {
          email,
          password,
          firstName,
          lastName
        }
      });
      if (response.statusCode === 200) {
        this.user = response.output;
        this.isAuthenticated = true;
      }
      return response;
    },
    async getProfile(): Promise<AuthUser> {
      const response: IResponse<AuthUser> = await $fetch("auth/profile");
      return response.output;
    },
    clearData() {
      this.$reset();
    }
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      maxAge: 2592000000,
    }),
  },
})