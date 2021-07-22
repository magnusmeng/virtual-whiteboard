import { Router } from 'next/dist/client/router'
import { ReactChild, ReactNode } from 'react'

const PROTECTED_ROUTES = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot']

const isBrowser = () => typeof window !== 'undefined'

export default function ProtectedRoutes({
  children,
  router,
}: {
  children: JSX.Element | null
  router: Router
}) {
  // TODO: Get the authenticated user
  let isAuthenticated = false

  let isProtectedPath = PROTECTED_ROUTES.indexOf(router.pathname) === -1

  if (isBrowser() && !isAuthenticated && isProtectedPath) {
    router.push('/auth/sign-in')
    return null
  }

  return children
}
