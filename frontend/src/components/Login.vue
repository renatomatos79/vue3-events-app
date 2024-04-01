<script setup lang="ts">
import { ref } from 'vue'

// Composables
import { useAuthentication } from '@/composables/useAuthentication'

// Stores
import { useGlobalStore } from '@/stores/globalStore'

// Components
import Alert from '@/components/Alert.vue'

// Define events
const emit = defineEmits(['login'])

// Init
const { login, token } = useAuthentication()
const username = ref('renatomatos79')
const password = ref('123456')
const globalStore = useGlobalStore()

async function doLogin() {
  await login(username.value, password.value)
  if (token.value) {
    emit('login', token)
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
            <form @submit.prevent="doLogin">
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
