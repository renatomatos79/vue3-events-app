<script setup lang="ts">
// Modules
import router from '@/router'
import { computed } from 'vue';

// Stores
import { useGlobalStore, useEventStore } from '@/stores'

// Instances
const globalStore = useGlobalStore()
const eventStore = useEventStore()

const isAuthenticated = computed(() => {
  const isAuth = (globalStore.token ?? '').trim() !== ''
  return isAuth
})

function handleLogout(event: Event): void {
  event.preventDefault()
  globalStore.resetData()
  eventStore.resetData()
  router.push({ name: 'login' })
}
</script>

<template>
  <ul class="nav justify-content-end">
    <li class="nav-item" v-if="!isAuthenticated">
      <RouterLink class="nav-link" aria-current="page" to="/login">Login</RouterLink>
    </li>
    <li class="nav-item" v-if="isAuthenticated">
      <RouterLink class="nav-link" aria-current="page" to="/">Events</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink class="nav-link" aria-current="page" to="/about">About</RouterLink>
    </li>
    <li class="nav-item" v-if="isAuthenticated">
      <a class="nav-link" href="#" @click="(evt) => handleLogout(evt)">Logout</a>
    </li>
  </ul>
</template>


