import React from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SuspenseLoader from './components/SuspenseLoader'
import { UserProvider } from './components/user/UserContext'

const Main = React.lazy(() => import('./pages/Main'))
const Users = React.lazy(() => import('./pages/Users'))
const AddUser = React.lazy(() => import('./pages/AddUser'))

export const App = () => {
  return (
    <>
      <Helmet>
        <title>{'Limur users'}</title>
        <meta name="description" content="template" />
      </Helmet>
      <UserProvider>
        <Router>
          <React.Suspense fallback={<SuspenseLoader />}>
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="*" element={<Main />} />
            </Routes>
          </React.Suspense>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
