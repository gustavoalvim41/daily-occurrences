import { useEffect, useState } from 'react'
import './styles.sass'

import db from '../../database'
import { Link } from 'react-router-dom'

type ParticipantsProps = {
  id?: number
  name: string
  position: string
}

function Participants(): JSX.Element {
  const [participants, setParticipants] = useState<ParticipantsProps[]>([])

  useEffect(() => {
    const fetchOccurrences = async (): Promise<void> => {
      const participants = await db.participants.toArray()
      setParticipants(participants as ParticipantsProps[])
    }

    fetchOccurrences()
  }, [participants])

  return (
    <main className="participants">
      <div className="head">
        <Link to="/regiterParticipant">novo participante</Link>
      </div>
      <div className="content">
        {participants.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Não foram encontrados participantes.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>código</th>
                <th>nome</th>
                <th>cargo</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.id}</td>
                  <td>{participant.name}</td>
                  <td>{participant.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}

export default Participants
