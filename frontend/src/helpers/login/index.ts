// Modules
import axios from 'axios'

// Configs
import { Configs } from '@/configs'

// Types
import { AUTH_DEFAULT_PASSWORD, AUTH_DEFAULT_USERNAME, AUTH_FAILURE, AUTH_INVALID_CREDENTIALS, AUTH_MISSING_PARAMETERS, AUTH_SOMETHING_WENT_WRONG } from '@/types/constants/auth-constants'

// Gets config instance
const config = new Configs()

// Gets axios instance
const client = axios.create({
  baseURL: `${config.baseURL}/api`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a response interceptor
client.interceptors.response.use(
  (response) => {
    return response
  }  
)

function loginMock(username: string, password: string): { data: string | null, error: string | null } {
  if ((username ?? '').trim() === '' || (password ?? '').trim() === '') {
    return { data: null, error: AUTH_MISSING_PARAMETERS }
  }

  if (username.trim() !== AUTH_DEFAULT_USERNAME || password.trim() !== AUTH_DEFAULT_PASSWORD) {
    return { data: null, error: AUTH_INVALID_CREDENTIALS }
  }

  return { data: '', error: null }
}


async function login(username: string, password: string): Promise<{ data: string | null, error: string | null }> {
  if (config.isMock) {
    return loginMock(username, password)
  }
  
  try {
    const response = await client.post('/login', {
      userName: username,
      password: password
    })

    if (response.status === 200) {
      return { data: response.data, error: null }
    } else if (response.status === 401) {
      return { data: null, error: AUTH_INVALID_CREDENTIALS }
    } else {
      return { data: null, error: AUTH_SOMETHING_WENT_WRONG }
    }
  } catch (e) {
    const error = e as unknown as Error
    if (error.message.includes('401')) {
      return { data: null, error: AUTH_FAILURE }
    }
    if (error.message.includes('400')) {
      return { data: null, error: AUTH_MISSING_PARAMETERS }
    }
  }
  return { data: null, error: null }
}

 export { login }
