import { defineStore } from 'pinia';
import { IResponse } from '~/types';
import { useLocalStorage, RemovableRef } from "@vueuse/core";

export type authStoreType = {
  token: RemovableRef<string>,
  user: RemovableRef<authResponse>;
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
    token: useLocalStorage("token", ""),
    user: useLocalStorage("user", {})
  } as authStoreType ),
  getters: {
    isAuthenticated: (state) => !!state.token,
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
        this.token = response.output.token;
        this.user = response.output;
      }
      return response;
    }
  }
})