<script setup lang="ts">
import { computed } from 'vue'

// Define component props
type ComponentProps = {
  message?: string
  type?: string
}

const props = withDefaults(defineProps<ComponentProps>(), {
  message: () => '',
  type: () => 'danger'
})

const alertClass = computed(() => {
  return `alert alert-${props.type}`
})
</script>

<template>
  <div :class="alertClass" role="alert">{{ message }}</div>
</template>
