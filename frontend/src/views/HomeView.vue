<script setup lang="ts">
import type {  Ref } from 'vue'
import { onMounted, ref } from 'vue'
import { loginApi } from '@/helpers/apiClient'
import { EventResponseModel } from '@/models/event-response.model'
import { useGlobalStore } from '@/stores/globalStore'
import Event from '@/components/Event.vue'

// Init
const globalStore = useGlobalStore()

const events: Ref<EventResponseModel[]> = ref([])

async function loadEvents() {
  const response = await loginApi.get('/events', {
    headers: { Authorization: 'Bearer ' + globalStore.token, 'Content-Type': 'application/json' }
  })
  console.log('data: ', response.data)

  const items = response.data.map((m: any) => new EventResponseModel({ ...m }))
  console.log('items: ', items)

  events.value = items
}

onMounted(async () => {
  console.log('onMounted...')
  await loadEvents()
})
</script>

<template>
  <div class="row">
    <div class="col-sm-3 mb-3 mt-3" v-for="event in events" :key="event.id">
      <Event :eventInfo="event" />
    </div>
  </div>
</template>
