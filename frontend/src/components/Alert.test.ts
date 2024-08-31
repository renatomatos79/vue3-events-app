// Modules
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// Components
import Alert from '@/components/Alert.vue'

describe('Alert', () => {
  it('renders the correct message', () => {
    const wrapper = mount(Alert, {
      props: {
        message: 'This is a test alert',
        type: 'success'
      }
    })

    expect(wrapper.text()).toContain('This is a test alert')
  })

  it('renders the correct alert class', () => {
    const wrapper = mount(Alert, {
      props: {
        message: 'This is a test alert',
        type: 'success'
      }
    })

    expect(wrapper.classes()).toContain('alert-success')
  })
})
