import { SetStateAction, useEffect, useState } from 'react'
import './styles.sass'

import db from '../../database'
import { Link } from 'react-router-dom'

type MenuProps = {
  setIsActive: React.Dispatch<SetStateAction<number>>
}

function Incidents({ setIsActive }: MenuProps): JSX.Element {
  type IncidentProps = {
    id?: number
    name: string
  }

  const [incidents, setIncidents] = useState<IncidentProps[]>([])

  useEffect(() => {
    const fetchOccurrences = async (): Promise<void> => {
      const incidents = await db.incidents.toArray()
      setIncidents(incidents as IncidentProps[])
    }

    fetchOccurrences()
  }, [incidents])

  return (
    <main className="incidents">
      <div className="head">
        <Link to="/registerIncident" onClick={(): void => setIsActive(9)}>
          novo incidente
        </Link>
      </div>
      <div className="content">
        {incidents.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Nenhum incidente foi encontrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>código</th>
                <th>incidentes</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id}>
                  <td>{incident.id}</td>
                  <td>{incident.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}

export default Incidents
