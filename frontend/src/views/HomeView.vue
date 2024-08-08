<script setup lang="ts">
// Modules
import  { onMounted } from 'vue'

// Components
import Event from '@/components/Event.vue'

// Composables
import { useEvents } from '@/composables'

// Stores
import { useGlobalStore, useEventStore } from '@/stores'

// Types
import { EventResponseModel } from '@/types'

// Init
const { events, loadEvents } = useEvents()
const eventStore = useEventStore()
const globalStore = useGlobalStore()

onMounted(async () => {
  console.log('onMounted...')
  await loadAllEvents()
})

async function loadAllEvents() {
  await loadEvents()
  console.log('data: ', events.value)
}

async function handleSubscribe(event: EventResponseModel): Promise<void> {
  const token = globalStore.token ?? ''
  eventStore.register(token, event)
  event.subscribed = eventStore.isRegistered(token, event.id)
}
</script>

<template>
  <div class="row">
    <div class="col-sm-3 mb-3 mt-3" v-for="event in events" :key="event.id">
      <Event :eventInfo="event" @subscribe="handleSubscribe" />
    </div>
  </div>
</template>
