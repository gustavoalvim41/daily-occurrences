import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'

import Home from '../screens/Home'
import Occurrences from '../screens/Occurrences'
import Register from '../screens/Register'
import Edit from '../screens/Edit'

function AppRouter(): JSX.Element {
  const [isActive, setIsActive] = useState(0)

  return (
    <Router>
      <Layout isActive={isActive} setIsActive={setIsActive}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Occurrences setIsActive={setIsActive} />} path="/occurrences" />
          <Route element={<Edit />} path="/occurrences/:id" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRouter
