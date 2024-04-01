<script setup lang="ts">
import router from '@/router'

// Stores
import { useGlobalStore } from '@/stores/globalStore'

// Components
import Login from '@/components/Login.vue'

// Init
const globalStore = useGlobalStore()

function handleLogin(token: string) {
  globalStore.setToken(token)
  router.push({ name: 'home' })
}
</script>

<template>
  <Login @login="handleLogin" />
</template>
