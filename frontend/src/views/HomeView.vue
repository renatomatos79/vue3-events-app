<script setup lang="ts">
// Modules
import { onMounted } from 'vue'

// Components
import Event from '@/components/Event.vue'
import Alert from '@/components/Alert.vue'

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
  await loadAllEvents()
})

async function loadAllEvents() {
  await loadEvents()
}

async function handleSubscribe(event: EventResponseModel): Promise<void> {
  const token = String(globalStore.token ?? '')
  await eventStore.register(token, event)
  event.subscribed = eventStore.isRegistered(token, String(event.id))
}

async function handleUnsubscribe(event: EventResponseModel): Promise<void> {
  const token = String(globalStore.token ?? '')
  await eventStore.unRegister(token, event)
  event.subscribed = eventStore.isRegistered(token, String(event.id))
}
</script>

<template>
  <div class="row">
    <div class="col-sm-3 mb-3 mt-3" v-for="event in events" :key="event.id">
      <Event :eventInfo="event" @subscribe="handleSubscribe" @unsubscribe="handleUnsubscribe" />
    </div>
  </div>
  <div class="row" v-if="events.length === 0">
    <div class="col-sm-12">
      <Alert message="No events to display!" />
    </div>
  </div>
</template>
