// Modules
import axios from 'axios'

// Configs
import { Configs } from '@/configs'

// Types
type HttpSettings = {
  config: Configs
  token?: string
}

export function httpClient(settings: HttpSettings) {
  const header: Record<string, string> = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate', // HTTP 1.1
    Pragma: 'no-cache', // HTTP 1.0
    Expires: '0' // Proxies
  }

  // when token is supplied, add it to the header
  if (settings.token) {
    header['Authorization'] = 'Bearer ' + settings.token
  }

  return axios.create({
    baseURL: `${settings.config.baseURL}/api`,
    withCredentials: false,
    headers: {
      ...header
    }
  })
}
