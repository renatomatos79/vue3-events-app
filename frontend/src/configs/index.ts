export class Configs {

    baseURL: string = ''
    isMock: boolean = false

    constructor() {
        this.baseURL = import.meta.env.VITE_APP_BASE_URL
        this.isMock = import.meta.env.IS_MOCK
    } 
}