<script setup lang="ts">
// Modules
import  {  type Ref, onMounted, ref } from 'vue'

// Components
import Event from '@/components/Event.vue'

// Composables
import { useEvents } from '@/composables'

// Init
const { events, loadEvents } = useEvents()

onMounted(async () => {
  console.log('onMounted...')
  await loadAllEvents()
})


async function loadAllEvents() {
  await loadEvents()
  console.log('data: ', events.value)
}
</script>

<template>
  <div class="row">
    <div class="col-sm-3 mb-3 mt-3" v-for="event in events" :key="event.id">
      <Event :eventInfo="event" />
    </div>
  </div>
</template>
