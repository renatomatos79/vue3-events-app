// Modules
import axios from 'axios'

// Configs
import { Configs } from '@/configs'

// Types
import { EventResponseModel, AUTH_FAILURE } from '@/types'

// Stores
import { useEventStore } from '@/stores/eventStore'

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
  const eventStore = useEventStore()
  const events = []
  let count = 1

  while (events.length < 100) {
    const eventId = count.toString()
    
    // check if event was already subscribed
    const isSubscribed = eventStore.isRegistered(token, eventId)
    
    // add event to the list
    events.push(new EventResponseModel({ 
      id: eventId, 
      title: `title-${count}`, 
      content: `content-${count}`, 
      speaker: `speaker-${count}`, 
      date: '2021-01-01', 
      subscribed: isSubscribed 
    }))

    count++
  }
  
  return { data: events, error: null}
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
