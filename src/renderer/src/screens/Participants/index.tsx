import { SetStateAction, useEffect, useState } from 'react'
import './styles.sass'

import db from '../../database'
import { Link } from 'react-router-dom'

type ParticipantsProps = {
  id?: number
  name: string
  position: string
}

type MenuProps = {
  setIsActive: React.Dispatch<SetStateAction<number>>
}

function Participants({ setIsActive }: MenuProps): JSX.Element {
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
        <Link to="/regiterParticipant" onClick={(): void => setIsActive(9)}>
          novo participante
        </Link>
      </div>
      <div className="content">
        {participants.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Nenhum participante foi encontrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>nome</th>
                <th>cargo</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td>
                    <Link to={`/editParticipant/${participant.id}`}>{participant.name}</Link>
                  </td>
                  <td>
                    <Link to={`/editParticipant/${participant.id}`}>{participant.position}</Link>
                  </td>
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
