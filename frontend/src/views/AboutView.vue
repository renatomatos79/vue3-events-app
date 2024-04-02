<script setup lang="ts">
import { Configs } from '@/configs'
const config = new Configs()
</script>

<template>
  <div class="card text-center">
    <div class="card-body">
      <h5 class="card-title">Get the full project on Github</h5>
      <p class="card-text">https://github.com/renatomatos79/vue3-events-app</p>
      <h5 class="card-title">Backend URL</h5>
      <p class="card-text">{{ config.baseURL }}</p>
    </div>
    <div class="card-footer text-muted">By Renato Matos on 2024-03-31</div>
  </div>
</template>
