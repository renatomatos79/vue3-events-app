/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_IS_MOCK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
