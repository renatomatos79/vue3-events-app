<script setup lang="ts">
import { computed } from 'vue'

type Props {
  message?: String
  type?: String
}

const props = withDefaults(defineProps<Props>(), {
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
