import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'

import Home from '../screens/Home'
import Occurrences from '../screens/Occurrences'
import Register from '../screens/Register'
import Edit from '../screens/Edit'

function AppRouter(): JSX.Element {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Occurrences />} path="/occurrences" />
          <Route element={<Edit />} path="/occurrences/:id" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRouter
