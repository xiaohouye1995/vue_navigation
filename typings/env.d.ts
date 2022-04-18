//  the ts of vite config file
/// <reference types="vite/client" />
export interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_IMAGE_URL: string
  readonly VITE_APP_ENV: string
  readonly VITE_APP_PROXY_URL: string
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
