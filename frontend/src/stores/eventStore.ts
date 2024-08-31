// Modules
import { defineStore } from 'pinia'

// Types
import { EventResponseModel, EventStateModel } from '@/types'

// Helper
import { unSubscribe, subscribe } from '@/helpers'

export const useEventStore = defineStore('eventStore', {
  state: () => ({ ...new EventStateModel() }),
  getters: {
    isRegistered: (state) => (token: string, id: string) => {
      if (!(token in state.events)) return false
      return state.events[token].some((evt) => evt.id === id)
    }
  },
  actions: {
    resetData() {
      this.events = {}
    },
    async register(token: string, event: EventResponseModel): Promise<void> {
      try {
        // subscribe to the event
        await subscribe(token, event)

        // check if exists
        const events = token in this.events ? this.events[token] : []

        // update
        events.push(event)

        // update dictionary
        this.events[token] = events
      } catch (error) {
        console.error('Error registering to event', error)
      }
    },
    async unRegister(token: string, event: EventResponseModel): Promise<void> {
      try {
        // subscribe to the event
        await unSubscribe(token, event)

        // check if exists
        const events = token in this.events ? this.events[token] : []

        // update
        const updateEvents = events.filter((evt) => evt.id !== event.id)

        // update dictionary
        this.events[token] = updateEvents
      } catch (error) {
        console.error('Error unRegistering from event', error)
      }
    }
  }
})
