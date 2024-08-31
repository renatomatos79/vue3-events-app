// Configs
import { Configs } from '@/configs'

// Types
import { EventResponseModel, AUTH_FAILURE } from '@/types'

// Stores
import { useEventStore } from '@/stores/eventStore'

// Helpers
import { httpClient } from '@/helpers'

// Gets config instance
const config = new Configs()

function getEventsMock(token: string): { data: EventResponseModel[] | null; error: string | null } {
  const eventStore = useEventStore()
  const events = []
  let count = 1

  while (events.length < 100) {
    const eventId = count.toString()

    // check if event was already subscribed
    const isSubscribed = eventStore.isRegistered(token, eventId)

    // add event to the list
    events.push(
      new EventResponseModel({
        id: eventId,
        title: `title-${count}`,
        content: `content-${count}`,
        speaker: `speaker-${count}`,
        date: '2021-01-01',
        subscribed: isSubscribed
      })
    )

    count++
  }

  return { data: events, error: null }
}

async function getEvents(
  token: string
): Promise<{ data: EventResponseModel[] | null; error: string | null }> {
  if (config.isMock) {
    return getEventsMock(token)
  }

  try {
    const response = await httpClient({ config }).get('/events', {
      headers: { Authorization: 'Bearer ' + token }
    })

    const data = response.data.map((m: any) => new EventResponseModel({ ...m }))
    return { data, error: null }
  } catch (e) {
    const error = e as Error
    if (error.message.includes('401')) {
      return { data: null, error: AUTH_FAILURE }
    }
  }
  return { data: null, error: null }
}

async function subscribe(
  token: string,
  event: EventResponseModel
): Promise<{ data: EventResponseModel | null; error: string | null }> {
  if (config.isMock) {
    // clone event and set subscribed to true
    const data = {
      ...event,
      subscribed: true
    } as EventResponseModel
    return { data, error: null }
  }

  try {
    const response = await httpClient({ config, token }).put(`/events/${event.id}/subscribe`, {
      timeout: 0
    })

    return { data: response.data as EventResponseModel, error: null }
  } catch (e) {
    const error = e as Error
    if (error.message.includes('401')) {
      return { data: null, error: AUTH_FAILURE }
    }
  }
  return { data: null, error: null }
}

async function unSubscribe(
  token: string,
  event: EventResponseModel
): Promise<{ data: EventResponseModel | null; error: string | null }> {
  if (config.isMock) {
    // clone event and set subscribed to true
    const data = {
      ...event,
      subscribed: false
    } as EventResponseModel
    return { data, error: null }
  }

  try {
    const response = await httpClient({ config, token }).delete(`/events/${event.id}`)

    return { data: response.data as EventResponseModel, error: null }
  } catch (e) {
    const error = e as Error
    if (error.message.includes('401')) {
      return { data: null, error: AUTH_FAILURE }
    }
  }
  return { data: null, error: null }
}

export { getEvents, subscribe, unSubscribe }
