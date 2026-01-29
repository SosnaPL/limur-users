import React, { createContext, useContext, useEffect, useState } from 'react'

import { User } from '../../types'

interface UserContextType {
  users: User[]
  loading: boolean
  error: string | null
  addUser: (user: User) => void
  deleteUser: (id: number) => void
  fetchUsers: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const STORAGE_KEY = 'limur_users_data'
const API_USERS_KEY = 'limur_api_users_fetched'

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    try {
      setLoading(true)

      let apiUsers: User[] = []
      const storedApiUsers = localStorage.getItem(API_USERS_KEY)

      if (storedApiUsers) {
        apiUsers = JSON.parse(storedApiUsers)
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!response.ok) {
          throw new Error('Błąd pobierania danych')
        }
        apiUsers = await response.json()
        localStorage.setItem(API_USERS_KEY, JSON.stringify(apiUsers))
      }

      const storedAddedUsers = localStorage.getItem(STORAGE_KEY)
      const addedUsers = storedAddedUsers ? JSON.parse(storedAddedUsers) : []

      setUsers([...addedUsers, ...apiUsers])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nieznany błąd')
      console.error('Błąd:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = (user: User) => {
    setUsers((prevUsers) => [user, ...prevUsers])

    const storedAddedUsers = localStorage.getItem(STORAGE_KEY)
    const addedUsers = storedAddedUsers ? JSON.parse(storedAddedUsers) : []
    addedUsers.unshift(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addedUsers))
  }

  const deleteUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))

    const storedAddedUsers = localStorage.getItem(STORAGE_KEY)
    if (storedAddedUsers) {
      const addedUsers = JSON.parse(storedAddedUsers)
      const updatedAdded = addedUsers.filter((u: User) => u.id !== id)
      if (updatedAdded.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAdded))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    const storedApiUsers = localStorage.getItem(API_USERS_KEY)
    if (storedApiUsers) {
      const apiUsers = JSON.parse(storedApiUsers)
      const updatedApi = apiUsers.filter((u: User) => u.id !== id)
      localStorage.setItem(API_USERS_KEY, JSON.stringify(updatedApi))
    }
  }

  const value: UserContextType = {
    users,
    loading,
    error,
    addUser,
    deleteUser,
    fetchUsers
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUsers must be used within UserProvider')
  }
  return context
}
