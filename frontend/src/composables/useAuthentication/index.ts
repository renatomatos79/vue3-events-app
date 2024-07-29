// Modules
import { ref } from 'vue'

// Helpers
import { login } from '@/helpers'

// Stores
import { useGlobalStore } from '@/stores/globalStore'

// Get store instance
const globalStore = useGlobalStore()

export function useAuthentication() {
  const token = ref<String | null>(null)

  async function auth(username: string, password: string) {    
    globalStore.resetData()
    token.value = null
    // starts the auth
    const response = await login(username, password)
    // validate response
    if (response.data != null && response.error === null) {
      token.value = response.data
    } else {
      globalStore.setErrorMessage(response.error ?? '')
    }
  }

  return {
    auth,
    token
  }
}