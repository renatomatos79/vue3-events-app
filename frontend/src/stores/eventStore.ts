// Modules
import { defineStore } from 'pinia'

// Types
import { EventResponseModel, EventStateModel } from '@/types'

export const useEventStore = defineStore('eventStore', {
  state: () => ({ ...new EventStateModel() }),
  getters: {
    isRegistered:
      state => 
      (token: string, id: string) => {
        if (!(token in state.events)) return false        
        return state.events[token].some(evt => evt.id === id)
      }
  },
  actions: {
    resetData() {
      this.events = {}
    },
    register(token: string, event: EventResponseModel): void {
      // check if exists
      const events = (token in this.events) ? this.events[token] : []

      console.log('register.events: ', events.map(m => m.id))
      // update
      events.push(event)
      
      // update dictionary
      this.events[token] = events
    }
  }
})
