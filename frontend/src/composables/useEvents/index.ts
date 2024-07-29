// Modules
import { ref } from 'vue'

// Helpers
import { getEvents } from '@/helpers'

// Stores
import { useGlobalStore } from '@/stores/globalStore'

// Types
import { EventResponseModel } from '@/types'

// Get store instance
const globalStore = useGlobalStore()

export function useEvents() {
  const events = ref<EventResponseModel[]>([])

  async function loadEvents(): Promise<void> {    
    globalStore.resetData()
    events.value = []
    // get events
    const response = await getEvents(globalStore.token ?? '')
    // validate response
    if (response.data != null && response.error === null) {
      events.value = response.data
    } else {
      globalStore.setErrorMessage(response.error ?? '')
    }
  }

  return {
    events,
    loadEvents
  }
}