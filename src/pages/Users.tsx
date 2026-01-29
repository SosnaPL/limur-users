import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Loader from 'assets/loader.json'
import LottieWrapper from 'components/LottieWrapper'
import { useUsers } from '../components/user/UserContext'
import UserModal from '../components/user/UserModal'
import '../styles/users.scss'
import { User } from '../types'

const Users = () => {
  const navigate = useNavigate()
  const { users, loading, error, deleteUser } = useUsers()

  const [searchAddress, setSearchAddress] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.address.street.toLowerCase().includes(searchAddress.toLowerCase()) ||
        user.address.city.toLowerCase().includes(searchAddress.toLowerCase()) ||
        user.address.suite.toLowerCase().includes(searchAddress.toLowerCase())
    )
  }, [users, searchAddress])

  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name)
      return sortOrder === 'asc' ? comparison : -comparison
    })
    return sorted
  }, [filteredUsers, sortOrder])

  const handleDelete = (id: number) => {
    if (window.confirm('Czy na pewno chcesz usunąć tego użytkownika?')) {
      deleteUser(id)
      setShowModal(false)
    }
  }

  const handleView = (user: User) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className="users-container">
      <div className="users-wrapper">
        <div className="users-card">
          <h1 className="users-title">Użytkownicy</h1>

          {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

          {!error && (
            <>
              <div className="users-controls">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Szukaj po adresie (ulica, miasto)..."
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    className="users-search-input"
                  />
                </div>
                <button onClick={() => navigate('/users/add')} className="btn btn-primary">
                  ➕ Dodaj użytkownika
                </button>
              </div>

              <div className="users-table-container">
                <div className="users-table-header">
                  <table className="w-full table-fixed">
                    <colgroup>
                      <col className="col-15" />
                      <col className="col-15" />
                      <col className="col-20" />
                      <col className="col-15" />
                      <col className="col-20" />
                      <col className="col-15" />
                    </colgroup>
                    <thead>
                      <tr>
                        <th onClick={toggleSortOrder}>
                          Nazwa
                          <svg
                            className={`w-4 h-4 ${sortOrder === 'desc' ? 'rotated' : ''}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M3 8l7 6 7-6H3z" />
                          </svg>
                        </th>
                        <th>Nazwa użytkownika</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Adres</th>
                        <th></th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="users-table-body">
                  {loading ? (
                    <div className="flex justify-center items-center" style={{ height: '300px' }}>
                      <LottieWrapper lottie={Loader} className={'h-52 w-52'} />
                    </div>
                  ) : (
                    <table className="w-full table-fixed">
                      <colgroup>
                        <col className="col-15" />
                        <col className="col-15" />
                        <col className="col-20" />
                        <col className="col-15" />
                        <col className="col-20" />
                        <col className="col-15" />
                      </colgroup>
                      <tbody>
                        {sortedUsers.map((user, idx) => (
                          <tr
                            key={user.id}
                            className={idx % 2 === 0 ? 'users-row-alt-1' : 'users-row-alt-2'}
                          >
                            <td className="users-cell-text">{user.name}</td>
                            <td className="users-cell-text">{user.username}</td>
                            <td className="users-cell-text">{user.email}</td>
                            <td className="users-cell-text">{user.phone}</td>
                            <td className="users-cell-text">
                              {user.address.street}, {user.address.suite}
                              <br />
                              {user.address.zipcode} {user.address.city}
                            </td>
                            <td className="users-cell-text">
                              <div className="inline-flex items-center justify-center gap-4">
                                <button
                                  onClick={() => handleView(user)}
                                  className="btn btn-primary"
                                >
                                  Podgląd
                                </button>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="btn btn-danger"
                                >
                                  Usuń
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {sortedUsers.length === 0 && (
                <div className="users-empty-state">
                  Brak użytkowników spełniających kryteria wyszukiwania.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <UserModal
        isOpen={showModal}
        user={selectedUser}
        onClose={() => setShowModal(false)}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Users
