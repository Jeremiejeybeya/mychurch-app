import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../../types'
import { api } from '../../api/client'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password })
        localStorage.setItem('token', data.token)
        set({ user: data.user, token: data.token, isAuthenticated: true })
      },

      register: async (firstName, lastName, email, password) => {
        const { data } = await api.post('/auth/register', { firstName, lastName, email, password })
        localStorage.setItem('token', data.token)
        set({ user: data.user, token: data.token, isAuthenticated: true })
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    { name: 'mychurch-auth', partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }) }
  )
)
