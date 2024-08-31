<script setup lang="ts">
// Modules
import router from '@/router'
import { computed } from 'vue'

// Stores
import { useGlobalStore, useEventStore } from '@/stores'

// Instances
const globalStore = useGlobalStore()
const eventStore = useEventStore()

const isAuthenticated = computed(() => {
  return (globalStore.token ?? '').trim() !== ''
})

function handleLogout(event: Event): void {
  try {
    event.preventDefault()
    globalStore.resetData()
    eventStore.resetData()
    router.push({ name: 'login' })
  } catch (error) {
    // doing nothing
  }
}
</script>

<template>
  <ul class="nav justify-content-end">
    <li id="alert-menu-login" class="nav-item" v-if="!isAuthenticated">
      <RouterLink class="nav-link" aria-current="page" to="/login">Login</RouterLink>
    </li>
    <li id="alert-menu-events" class="nav-item" v-if="isAuthenticated">
      <RouterLink class="nav-link" aria-current="page" to="/">Events</RouterLink>
    </li>
    <li id="alert-menu-about" class="nav-item">
      <RouterLink class="nav-link" aria-current="page" to="/about">About</RouterLink>
    </li>
    <li id="alert-menu-logout" class="nav-item" v-if="isAuthenticated">
      <a class="nav-link" href="#" @click="(evt) => handleLogout(evt)">Logout</a>
    </li>
  </ul>
</template>
