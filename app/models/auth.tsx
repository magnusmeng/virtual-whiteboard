import axios, { AxiosInstance } from 'axios'
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  config,
  LOCAL_STORAGE_TOKEN_KEY,
  LOCAL_STORAGE_USER_KEY,
} from './constants'
import ITeam from './team'
import IUser, { ISignUpData } from './user'

interface IAuthContext {
  apiClient: AxiosInstance

  isAuthorized: boolean
  user?: IUser
  activeTeam?: ITeam

  signIn: (email: string, password: string) => Promise<IUser>
  signUp: (values: ISignUpData) => Promise<IUser>
  signOut: () => Promise<void>
}

export const AuthContext = React.createContext<IAuthContext | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      'Please provide the AuthContext with the AuthContextProvider before consuming it'
    )
  }
  return context
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [setupDone, setSetupDone] = useState(false)

  const [user, setUser] = useState<IUser | undefined>()
  const [token, setToken] = useState<string>()

  const [activeTeam, setActiveTeam] = useState<ITeam | undefined>(undefined)

  const apiClient = useMemo(() => {
    const headers: { [key: string]: string } = {}
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const apiClient = axios.create({
      baseURL: config.apiUrl,
      headers,
    })
    return apiClient
  }, [token])

  const signIn: IAuthContext['signIn'] = React.useCallback(
    async (email, password) => {
      const res = await apiClient.post<{ accessToken: string; user: IUser }>(
        'auth/sign-in',
        {
          email,
          password,
        },
        {
          headers: {},
        }
      )
      setUser(res.data.user)
      setToken(res.data.accessToken)
      return res.data.user
    },
    [apiClient]
  )

  const signUp: IAuthContext['signUp'] = React.useCallback(
    async (values) => {
      const { data } = await apiClient.post<{
        accessToken: string
        user: IUser
      }>('auth/sign-up', values)
      setUser(data.user)
      setToken(data.accessToken)
      return data.user
    },
    [apiClient]
  )

  const signOut: IAuthContext['signOut'] = React.useCallback(async () => {
    setToken(undefined)
    setUser(undefined)
    setActiveTeam(undefined)
    self.localStorage.clear()
  }, [])

  const fetchUser = React.useCallback(async () => {
    if (!token) return
    const { data } = await apiClient.get<IUser>('users/me')
    setUser(data)
  }, [apiClient, token])

  useEffect(() => {
    // We cache the access token on local storage
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
    }
  }, [token])

  useEffect(() => {
    // We cache the user on local storage
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user))
    }
  }, [user])

  useEffect(() => {
    // This effect will do an initial fetch to get the user based on the cached token.
    if (setupDone) return

    const cachedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
    if (cachedToken) {
      setToken(cachedToken)
      fetchUser().finally(() =>
        // Give react a couple of miliseconds to rerender
        setTimeout(() => {
          setSetupDone(true)
        }, 100)
      )
    } else {
      setSetupDone(true)
    }
  }, [fetchUser, setupDone])

  return (
    <AuthContext.Provider
      value={{
        apiClient,

        isAuthorized: !!token && !!user,
        user,
        activeTeam,

        signIn,
        signUp,
        signOut,
      }}
    >
      {!setupDone ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-xl font-serif">Loading</p>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
