import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from '../components/Layout'

import Home from '../screens/Home'

import Occurrences from '../screens/Occurrences'
import RegisterOccurrences from '../screens/Occurrences/RegisterOccurrences'
import EditOccurrences from '../screens/Occurrences/EditOccurrences'

import Incidents from '../screens/Incidents'
import RegisterIncident from '../screens/Incidents/RegisterIncident'
import EditIncident from '../screens/Incidents/EditIncident'

import Participants from '../screens/Participants'
import RegiterParticipant from '../screens/Participants/RegiterParticipant'
import EditParticipant from '../screens/Participants/EditParticipant'

function AppRouter(): JSX.Element {
  const [isActive, setIsActive] = useState(0)

  return (
    <Router>
      <Layout isActive={isActive} setIsActive={setIsActive}>
        <Routes>
          <Route element={<Home />} path="/" />

          <Route element={<Occurrences setIsActive={setIsActive} />} path="/occurrences" />
          <Route element={<EditOccurrences />} path="/editOccurrences/:id" />
          <Route element={<RegisterOccurrences />} path="/registerOccurrences" />

          <Route element={<Incidents setIsActive={setIsActive} />} path="/incidents" />
          <Route element={<RegisterIncident />} path="/registerIncident" />
          <Route element={<EditIncident />} path="/editIncident/:id" />

          <Route element={<Participants setIsActive={setIsActive} />} path="/participants" />
          <Route element={<RegiterParticipant />} path="/regiterParticipant" />
          <Route element={<EditParticipant />} path="/editParticipant/:id" />
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRouter
