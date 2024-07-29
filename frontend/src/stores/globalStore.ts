import { defineStore } from 'pinia'
import { GlobalStateModel } from '@/types/models/global-state.model'

export const useGlobalStore = defineStore('global', {
  state: () => ({ ...new GlobalStateModel() }),
  getters: {
    isAuthenticated(): boolean {
      return this.token !== null
    }
  },
  actions: {
    setErrorMessage(errorMessage: string) {
      this.errorMessage = errorMessage
    },
    setToken(token: string) {
      this.token = token
    },
    resetData() {
      this.errorMessage = ''
      this.token = null
    }
  }
})
