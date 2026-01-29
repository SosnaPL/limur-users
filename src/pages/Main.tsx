import { useNavigate } from 'react-router-dom'

import '../styles/users.scss'

export const Main = () => {
  const navigate = useNavigate()

  return (
    <div className="main-container">
      <div className="main-content">
        <h1 className="main-title">Limur Users</h1>
        <p className="main-subtitle">Zarządzaj listą użytkowników</p>
        <div className="main-actions">
          <button onClick={() => navigate('/users')} className="btn btn-primary btn-lg">
            <span className="btn-icon">👥</span>
            Przejdź do listy użytkowników
          </button>
          <button onClick={() => navigate('/users/add')} className="btn btn-secondary btn-lg">
            <span className="btn-icon">➕</span>
            Dodaj nowego użytkownika
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
