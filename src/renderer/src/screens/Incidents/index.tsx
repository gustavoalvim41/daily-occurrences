import { useState } from 'react'
import './styles.sass'

import db from '../../database'

function Incidents(): JSX.Element {
  const [selectedIncident, setSelectedIncident] = useState('')

  function handleIncidentChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value
    setSelectedIncident(data)
  }

  function handleIncidentRegister(): void {
    if (selectedIncident !== '') {
      db.incidents.add({
        name: selectedIncident.toLowerCase()
      })
      ClearInput()
    }
  }

  function ClearInput(): void {
    setSelectedIncident('')
  }

  return (
    <main className="incidents">
      <div className="row">
        <div>
          <input
            type="text"
            placeholder="Novo Incidente"
            value={selectedIncident}
            onChange={handleIncidentChange}
          />
          <button onClick={handleIncidentRegister}>cadastrar</button>
        </div>
      </div>
    </main>
  )
}

export default Incidents
