import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUsers } from '../components/user/UserContext'
import '../styles/users.scss'
import { User } from '../types'

interface FormData {
  name: string
  username: string
  email: string
  phone: string
  street: string
  suite: string
  city: string
  zipcode: string
  companyName: string
}

interface FormErrors {
  [key: string]: string
}

const AddUser = () => {
  const navigate = useNavigate()
  const { addUser } = useUsers()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
    phone: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    companyName: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateZipcode = (zipcode: string): boolean => {
    const zipcodeRegex = /^\d{2}-\d{3}$|^\d{5}$|^\d{4}$|^[A-Z]\d[A-Z]\s\d[A-Z]{2}$/
    return zipcodeRegex.test(zipcode)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/
    return phoneRegex.test(phone)
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane'
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Nazwa użytkownika jest wymagana'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email jest niepoprawny'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon jest wymagany'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Telefon jest niepoprawny'
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Ulica jest wymagana'
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Miasto jest wymagane'
    }
    if (!formData.zipcode.trim()) {
      newErrors.zipcode = 'Kod pocztowy jest wymagany'
    } else if (!validateZipcode(formData.zipcode)) {
      newErrors.zipcode = 'Kod pocztowy jest niepoprawny (np. 12-345 lub 12345)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const newUser: User = {
      id: Math.floor(Math.random() * 13337),
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode
      },
      company: formData.companyName
        ? {
            name: formData.companyName
          }
        : undefined
    }

    addUser(newUser)

    setSubmitted(true)
    setShowConfirmation(true)
  }

  const handleConfirmation = () => {
    setShowConfirmation(false)
    navigate('/users')
  }

  const handleCancelConfirmation = () => {
    setShowConfirmation(false)
    setSubmitted(false)
  }

  return (
    <div className="users-container">
      <div className="users-wrapper">
        <div className="users-card">
          <h1 className="users-title">Dodaj nowego użytkownika</h1>

          {submitted && !showConfirmation && (
            <div className="form-success-message">✓ Użytkownik został pomyślnie dodany!</div>
          )}

          <form onSubmit={handleSubmit} className="add-user-form">
            <fieldset className="form-section">
              <legend className="form-section-title">Informacje osobowe</legend>

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Imię i nazwisko <span className="form-required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jan Kowalski"
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Nazwa użytkownika <span className="form-required">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="jankowalski"
                  className={`form-input ${errors.username ? 'form-input-error' : ''}`}
                />
                {errors.username && <span className="form-error">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="form-required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jan@example.com"
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Telefon <span className="form-required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+48 123 456 789"
                  className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend className="form-section-title">Adres</legend>

              <div className="form-group">
                <label htmlFor="street" className="form-label">
                  Ulica <span className="form-required">*</span>
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="ul. Główna"
                  className={`form-input ${errors.street ? 'form-input-error' : ''}`}
                />
                {errors.street && <span className="form-error">{errors.street}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="suite" className="form-label">
                  Nr mieszkania / budynku
                </label>
                <input
                  type="text"
                  id="suite"
                  name="suite"
                  value={formData.suite}
                  onChange={handleChange}
                  placeholder="nr 42"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  Miasto <span className="form-required">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Warszawa"
                  className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                />
                {errors.city && <span className="form-error">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="zipcode" className="form-label">
                  Kod pocztowy <span className="form-required">*</span>
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="00-000"
                  className={`form-input ${errors.zipcode ? 'form-input-error' : ''}`}
                />
                {errors.zipcode && <span className="form-error">{errors.zipcode}</span>}
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend className="form-section-title">Firma (opcjonalnie)</legend>

              <div className="form-group">
                <label htmlFor="companyName" className="form-label">
                  Nazwa firmy
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Nazwa Twojej firmy"
                  className="form-input"
                />
                <small className="form-hint">To pole jest opcjonalne</small>
              </div>
            </fieldset>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Dodaj
              </button>
              <button type="button" onClick={() => navigate('/users')} className="btn btn-danger">
                Anuluj
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Potwierdzenie</h2>
            <div className="modal-body">
              <p className="modal-confirmation-message">Użytkownik został pomyślnie dodany!</p>
            </div>
            <div className="modal-footer">
              <button onClick={handleCancelConfirmation} className="btn btn-secondary">
                Zostań tutaj
              </button>
              <button onClick={handleConfirmation} className="btn btn-primary">
                Przejdź do listy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddUser
