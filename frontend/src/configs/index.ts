export class Configs {
  baseURL: string
  isMock: boolean

  constructor() {
    this.baseURL = import.meta.env.VITE_APP_BASE_URL
    this.isMock = import.meta.env.VITE_APP_IS_MOCK === 'true'
  }
}
