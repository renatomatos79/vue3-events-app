<script setup lang="ts">
defineProps({
  message: String
})
</script>

<template>
  <div class="alert alert-danger" role="alert">{{ message }}</div>
</template>
