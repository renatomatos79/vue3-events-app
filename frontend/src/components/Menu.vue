<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore'
import router from '@/router'

const globalStore = useGlobalStore()

function logout(event: Event): void {
  event.preventDefault()
  globalStore.resetData()
  router.push({ name: 'login' })
}
</script>

<template>
  <ul class="nav justify-content-end">
    <li class="nav-item" v-if="!globalStore.isAuthenticated">
      <RouterLink class="nav-link" aria-current="page" to="/login">Login</RouterLink>
    </li>
    <li class="nav-item" v-if="globalStore.isAuthenticated">
      <RouterLink class="nav-link" aria-current="page" to="/">Events</RouterLink>
    </li>
    <li class="nav-item">
      <RouterLink class="nav-link" aria-current="page" to="/about">About</RouterLink>
    </li>
    <li class="nav-item" v-if="globalStore.isAuthenticated">
      <a class="nav-link" href="#" @click="(evt) => logout(evt)">Logout</a>
    </li>
  </ul>
</template>

<style scoped></style>
