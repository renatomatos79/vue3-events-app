import { ref } from 'vue'
import { loginApi } from '@/helpers/apiClient/index'
import { useGlobalStore } from '@/stores/globalStore'

export function useAuthentication() {
  const token = ref<String | null>(null)

  async function login(username: string, password: string) {
    const globalStore = useGlobalStore()

    try {
      globalStore.resetData()
      token.value = null

      const response = await loginApi.post('/login', {
        userName: username,
        password: password
      })

      if (response.status === 200) {
        token.value = response.data
      } else if (response.status === 401) {
        globalStore.setErrorMessage('Invalid credentials')
      } else {
        globalStore.setErrorMessage('some exception occurred while logging in')
      }
    } catch (e) {
      const error = e as unknown as Error
      if (error.message.includes('401')) {
        globalStore.setErrorMessage('Error occurred while logging in')
      }
      if (error.message.includes('400')) {
        globalStore.setErrorMessage('Missing parameters')
      }
    }
  }

  return {
    token,
    login
  }
}
