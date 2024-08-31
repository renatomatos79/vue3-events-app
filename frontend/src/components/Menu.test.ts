// Modules
import { describe, it, expect, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

// Components
import Menu from '@/components/Menu.vue'

// Stores
import { useGlobalStore, useEventStore } from '@/stores'

// Mocks
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  currentRoute: {
    value: {
      path: '/mocked-path'
    }
  }
}

function buildMount(token: string): VueWrapper<Partial<typeof Menu>> {
  return mount(Menu, {
    global: {
      mocks: {
        $router: mockRouter,
        $route: mockRouter.currentRoute
      },
      plugins: [
        createTestingPinia({
          fakeApp: true,
          stubActions: false,
          createSpy: vi.fn,
          initialState: {
            globalStore: {
              token
            }
          }
        })
      ],
      stubs: ['RouterLink']
    }
  })
}

describe('Menu', () => {
  it('should render login and about menus when is not authenticated', () => {
    const wrapper = buildMount('')

    expect(wrapper.find('#alert-menu-login').exists()).toBe(true)
    expect(wrapper.find('#alert-menu-events').exists()).toBe(false)
    expect(wrapper.find('#alert-menu-about').exists()).toBe(true)
    expect(wrapper.find('#alert-menu-logout').exists()).toBe(false)
  })

  it('should render events, about and logoutmenus when is authenticated', async () => {
    const wrapper = buildMount('1234')

    expect(wrapper.find('#alert-menu-login').exists()).toBe(false)
    expect(wrapper.find('#alert-menu-events').exists()).toBe(true)
    expect(wrapper.find('#alert-menu-about').exists()).toBe(true)
    expect(wrapper.find('#alert-menu-logout').exists()).toBe(true)
  })

  it('should reset store content when handleLogout is called', async () => {
    try {
      const wrapper = buildMount('1234')
      const globalStore = useGlobalStore()
      const eventStore = useEventStore()

      await wrapper.vm.handleLogout(new Event('click'))

      expect(globalStore.resetData).toHaveBeenCalled()
      expect(eventStore.resetData).toHaveBeenCalled()
    } catch (error) {
      throw new Error(error?.toString())
    }
  })
})
