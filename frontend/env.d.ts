/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  readonly IS_MOCK: bollean
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv  
}