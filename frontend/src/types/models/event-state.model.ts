import { EventResponseModel } from '@/types'

export class EventStateModel {
  events: Record<string, EventResponseModel[]>

  constructor() {
    this.events = {}
  }
}
