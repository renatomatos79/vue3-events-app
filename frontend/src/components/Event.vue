<script setup lang="ts">
// Types
import { EventResponseModel } from '@/types'

// Define component props
type ComponentProps = {
  eventInfo?: EventResponseModel
}

const props = withDefaults(defineProps<ComponentProps>(), {
  eventInfo: () => new EventResponseModel()
})
</script>

<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h3 class="card-title">{{ eventInfo?.title }}</h3>
      <h6 class="card-title">{{ eventInfo?.speaker }}</h6>
      <h6 class="card-title">{{ eventInfo?.date }}</h6>
      <p class="card-text">
        {{ eventInfo?.content }}
      </p>
      <a href="#" class="btn btn-primary">Subscribe</a>
    </div>
  </div>
</template>
