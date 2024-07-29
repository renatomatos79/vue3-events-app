// Modules
import axios from 'axios'

// Configs
import { Configs } from '@/configs'

// Types
import { EventResponseModel, AUTH_FAILURE } from '@/types'

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

function getEventsMock(token: string): { data: EventResponseModel[] | null, error: string | null } {
  return { data: [
    new EventResponseModel({ id: '1', title: 'title-1', content: 'content-1', speaker: 'speaker-1', date: '2021-01-01' }),
    new EventResponseModel({ id: '2', title: 'title-2', content: 'content-2', speaker: 'speaker-2', date: '2021-01-01' }),
    new EventResponseModel({ id: '3', title: 'title-3', content: 'content-3', speaker: 'speaker-3', date: '2021-01-01' }),
    new EventResponseModel({ id: '4', title: 'title-4', content: 'content-4', speaker: 'speaker-4', date: '2021-01-01' }),
  ], error: null}
}


async function getEvents(token: string): Promise<{ data: EventResponseModel[] | null, error: string | null }> {
  console.log('getEvents.config.isMock: ', config.isMock)
  
  if (config.isMock) {
    return getEventsMock(token)
  }
  
  try {
    const response = await client.get('/events', {
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
    })
    
    return response.data.map((m: any) => new EventResponseModel({ ...m }))
  } catch (e) {
    const error = e as unknown as Error
    if (error.message.includes('401')) {
      return { data: null, error: AUTH_FAILURE }
    }
  }
  return { data: null, error: null }
}

 export { getEvents }
