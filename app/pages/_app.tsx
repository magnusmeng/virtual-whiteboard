import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProtectedRoutes from '../components/ProtectedRoutes'
import { SWRConfig } from 'swr'
import { AuthContextProvider } from '../models'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthContextProvider>
      <SWRConfig
        value={{
          refreshInterval: 3000,
        }}
      >
        <ProtectedRoutes router={router}>
          <Component {...pageProps} />
        </ProtectedRoutes>
      </SWRConfig>
    </AuthContextProvider>
  )
}
export default MyApp
