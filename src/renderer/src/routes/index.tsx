import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'

import Home from '../screens/Home'
import Settings from '../screens/Settings'
import Occurrences from '@renderer/screens/Occurrences'

function AppRouter(): JSX.Element {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Settings />} path="/settings" />
          <Route element={<Occurrences />} path="/occurrences" />
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRouter
