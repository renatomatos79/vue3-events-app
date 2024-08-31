// Modules
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Components
import Event from '@/components/Event.vue'

// Types
import { EventResponseModel } from '@/types'

// Constants
const EVENT_INFO = new EventResponseModel({
  id: '1234',
  title: 'event title',
  content: 'event content',
  speaker: 'Paul',
  date: '2024-01-01',
  subscribed: false
})

describe('Event', () => {
  it.each(['title', 'speaker'])('renders the correct property: %s', (property) => {
    const wrapper = mount(Event, {
      props: {
        eventInfo: EVENT_INFO
      }
    })

    switch (property) {
      case 'title': {
        expect(wrapper.text()).toContain(EVENT_INFO.title)
        break
      }
      case 'speaker': {
        expect(wrapper.text()).toContain(EVENT_INFO.speaker)
        break
      }
    }
  })
})
