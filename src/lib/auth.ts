// src/lib/auth.ts

export type UserRole = "retailer" | "distributor"

export interface User {
  id: string
  name: string
  email: string
  mobile: string
  role: UserRole
  storeName?: string
  distributorName?: string
}

const USER_KEY = "app_user"

export const setUser = (user: User) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(USER_KEY)
}

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY)
  }
}
