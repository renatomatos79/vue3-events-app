<script setup lang="ts">
import router from '@/router'

// Stores
import { useGlobalStore } from '@/stores/globalStore'

// Components
import Login from '@/components/Login.vue'

// Init
const globalStore = useGlobalStore()

function handleLogin(token: string) {
  console.log('handleLogin.token: ', token)
  globalStore.token = token
  console.log('handleLogin.globalStore.token: ', globalStore.token)
  router.push({ name: 'home' })
}
</script>

<template>
  <Login @login="handleLogin" />
</template>
