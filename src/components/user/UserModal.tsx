import React from 'react'

import '../../styles/users.scss'
import { User } from '../../types'

interface UserModalProps {
  isOpen: boolean
  user: User | null
  onClose: () => void
  onDelete: (id: number) => void
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, user, onClose, onDelete }) => {
  if (!isOpen || !user) {
    return null
  }

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-content">
        <h2 className="modal-title">Szczegóły użytkownika</h2>
        <button aria-label="Zamknij" onClick={onClose} className="modal-close-btn">
          ×
        </button>
        <div className="modal-body">
          <div className="modal-field">
            <p className="modal-label">Imię i nazwisko</p>
            <p className="modal-value">{user.name}</p>
          </div>
          <div className="modal-field">
            <p className="modal-label">Nazwa użytkownika</p>
            <p className="modal-value">{user.username}</p>
          </div>
          <div className="modal-field">
            <p className="modal-label">Email</p>
            <p className="modal-value">{user.email}</p>
          </div>
          <div className="modal-field">
            <p className="modal-label">Telefon</p>
            <p className="modal-value">{user.phone}</p>
          </div>
          <div className="modal-field">
            <p className="modal-label">Strona internetowa</p>
            <p className="modal-value">{user.website}</p>
          </div>
          <div className="modal-field">
            <p className="modal-label">Adres</p>
            <p className="modal-value">
              {user.address.street}, {user.address.suite}
              <br />
              {user.address.zipcode} {user.address.city}
            </p>
          </div>
          {user.company && (
            <div className="modal-field">
              <p className="modal-label">Firma</p>
              <p className="modal-value">{user.company.name}</p>
              {user.company.catchPhrase && (
                <p className="modal-company-phrase">{user.company.catchPhrase}</p>
              )}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={() => onDelete(user.id)} className="btn btn-danger">
            Usuń
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserModal
