// Modules
import { defineStore } from 'pinia'

// Types
import { GlobalStateModel } from '@/types'

export const useGlobalStore = defineStore('global', {
  state: () => ({ ...new GlobalStateModel() }),
  actions: {
    resetData() {
      this.errorMessage = ''
      this.token = null
    }
  }
})
