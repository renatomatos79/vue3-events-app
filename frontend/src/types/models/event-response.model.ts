export class EventResponseModel {
  id: string = ''
  title: string = ''
  content: string = ''
  speaker: string = ''
  date: string = ''
  subscribed: boolean = false

  constructor(payload?: Partial<EventResponseModel> | null) {
    this.id = payload?.id ?? ''
    this.title = payload?.title ?? ''
    this.content = payload?.content ?? ''
    this.speaker = payload?.speaker ?? ''
    this.date = payload?.date ?? ''
    this.subscribed = payload?.subscribed ?? false
  }
}
