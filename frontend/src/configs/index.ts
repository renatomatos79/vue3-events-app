export class Configs {

    baseURL: string 
    isMock: boolean 

    constructor() {
        console.log('cto.meta.env.VITE_APP_BASE_URL: ', import.meta.env.VITE_APP_BASE_URL)
        console.log('cto.meta.env.VITE_APP_IS_MOCK: ', import.meta.env.VITE_APP_IS_MOCK)
        
        this.baseURL = import.meta.env.VITE_APP_BASE_URL
        this.isMock = import.meta.env.VITE_APP_IS_MOCK
    } 
}