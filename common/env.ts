export const PROD_URL = 'https://application-portal.vercel.app'

/**
 * get the current host. works on both node and browser
 */
export const getHost = (): string | false =>
  process.env.DOMAIN ||
  (typeof window !== 'undefined' && window?.location?.origin)

export const getEnv = (): 'production' | 'dev' => {
  switch (getHost()) {
    case PROD_URL:
      return 'production'
    default:
      return 'dev'
  }
}

export const isProd = (): boolean => getHost() === PROD_URL
