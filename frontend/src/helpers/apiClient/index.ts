import axios from 'axios'
import { useGlobalStore } from '@/stores/globalStore'
import { Configs } from '@/configs'

const config = new Configs()

const loginApi = axios.create({
  baseURL: `${config.baseURL}/api`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
loginApi.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const globalStore = useGlobalStore()
    // Check if the error is a 401 Unauthorized response
    if (error.response && error.response.status === 401) {
      // Redirect the user to the login page or perform any other action
      globalStore.setErrorMessage('Username or password is invalid!')
    }
    // Check if the error is a 400 BadRequest response
    if (error.response && error.response.status === 400) {
      // Redirect the user to the login page or perform any other action
      globalStore.setErrorMessage('Username or password can not be null!')
    }
  }
)

export { loginApi }
