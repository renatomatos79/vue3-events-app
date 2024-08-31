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

const emit = defineEmits<{
  subscribe: [event: EventResponseModel]
  unsubscribe: [event: EventResponseModel]
}>()

function handleSubscribe(): void {
  if (props.eventInfo.subscribed) {
    emit('unsubscribe', props.eventInfo)
  } else {
    emit('subscribe', props.eventInfo)
  }
}
</script>

<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h3 class="card-title col-6">{{ eventInfo?.title }}</h3>
      <h6 class="card-title">{{ eventInfo?.speaker }}</h6>
      <h6 class="card-title">{{ eventInfo?.date }}</h6>
      <p class="card-text">
        {{ eventInfo?.content }}
      </p>
      <a
        href="#"
        class="btn"
        @click="handleSubscribe"
        :class="{ 'btn-primary': !eventInfo.subscribed, 'btn-danger': eventInfo.subscribed }"
      >
        {{ eventInfo.subscribed ? 'Unsubscribe' : 'Subscribe' }}
      </a>
    </div>
  </div>
</template>
