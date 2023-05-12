import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'

import Home from '../screens/Home'
import Settings from '../screens/Settings'

function AppRouter(): JSX.Element {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Settings />} path="/settings" />
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRouter
