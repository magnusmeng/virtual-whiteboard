import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProtectedRoutes from '../components/ProtectedRoutes'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ProtectedRoutes router={router}>
      <Component {...pageProps} />
    </ProtectedRoutes>
  )
}
export default MyApp
