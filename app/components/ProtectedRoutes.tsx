import { Router } from 'next/dist/client/router'
import { ReactChild, ReactNode } from 'react'
import { useAuth } from '../models'

const PROTECTED_ROUTES = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot']

const isBrowser = () => typeof window !== 'undefined'

export default function ProtectedRoutes({
  children,
  router,
}: {
  children: JSX.Element | null
  router: Router
}) {
  const auth = useAuth()

  // TODO: Get the authenticated user

  let isProtectedPath = PROTECTED_ROUTES.indexOf(router.pathname) === -1

  if (isBrowser() && !auth.isAuthorized && isProtectedPath) {
    router.push('/auth/sign-in')
    return null
  }

  return children
}
