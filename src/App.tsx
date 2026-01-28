import React from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SuspenseLoader from './components/SuspenseLoader'

const Main = React.lazy(() => import('./pages/Main'))

export const App = () => {
  return (
    <>
      <Helmet>
        <title>{'Limur users'}</title>
        <meta name="description" content="template" />
      </Helmet>
      <Router>
        <React.Suspense fallback={<SuspenseLoader />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </React.Suspense>
      </Router>
    </>
  )
}

export default App
