// Modules
import { ref } from 'vue'

// Helpers
import { login } from '@/helpers'

// Stores
import { useGlobalStore } from '@/stores/globalStore'

export function useAuthentication() {
  const globalStore = useGlobalStore()
  const token = ref<String | null>(null)

  async function auth(username: string, password: string) {    
    token.value = null
    // starts the auth
    const response = await login(username, password)
    // validate response
    if (response.data != null && response.error === null) {
      token.value = response.data
    } else {
      globalStore.errorMessage = response.error ?? ''
    }
  }

  return {
    auth,
    token
  }
}