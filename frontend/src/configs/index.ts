export class Configs {

    baseURL: string = ''

    constructor() {
        this.baseURL = import.meta.env.VITE_APP_BASE_URL
    } 
}