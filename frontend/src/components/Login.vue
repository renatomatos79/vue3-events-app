<script setup lang="ts">
import { ref } from 'vue'

// Composables
import { useAuthentication } from '@/composables'

// Stores
import { useGlobalStore } from '@/stores'

// Components
import Alert from '@/components/Alert.vue'

// Types
import {  AUTH_DEFAULT_PASSWORD, AUTH_DEFAULT_USERNAME } from '@/types/constants/auth-constants'

// Define events
const emit = defineEmits<{
  login: [token: string]
}>()

// Init
const { auth, token } = useAuthentication()
const username = ref(AUTH_DEFAULT_USERNAME)
const password = ref(AUTH_DEFAULT_PASSWORD)
const globalStore = useGlobalStore()

async function handleLogin() {
  await auth(username.value, password.value)
  if (token.value) {
    emit('login', String(token.value ?? ''))
  }
}
</script>

<template>
  <div id="app" class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
              <div class="mt-3">
                <Alert :message="globalStore.errorMessage" v-if="globalStore.errorMessage" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
