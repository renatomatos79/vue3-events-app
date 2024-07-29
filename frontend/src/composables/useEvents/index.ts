// Modules
import { ref } from 'vue'

// Helpers
import { getEvents } from '@/helpers'

// Stores
import { useGlobalStore } from '@/stores/globalStore'

// Types
import { EventResponseModel } from '@/types'

export function useEvents() {
  const globalStore = useGlobalStore()
  const events = ref<EventResponseModel[]>([])

  async function loadEvents(): Promise<void> {    
    events.value = []
    // get events
    const response = await getEvents(globalStore.token ?? '')
    // validate response
    if (response.data != null && response.error === null) {
      events.value = response.data
    } else {
      globalStore.errorMessage = response.error ?? ''
    }
  }

  return {
    events,
    loadEvents
  }
}