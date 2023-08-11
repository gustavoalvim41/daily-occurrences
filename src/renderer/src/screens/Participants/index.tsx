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
  const ITEMS_PER_PAGE = 10

  const [participants, setParticipants] = useState<ParticipantsProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function fetchParticipants(): Promise<void> {
      const participants = await db.participants.toArray()
      setParticipants(participants as ParticipantsProps[])
    }

    fetchParticipants()
  }, [participants])

  function getCurrentItems(): ParticipantsProps[] {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return participants.slice(startIndex, endIndex)
  }

  function goToPrevPage(): void {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  function goToNextPage(): void {
    const totalPages = Math.ceil(participants.length / ITEMS_PER_PAGE)
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    } else {
      setCurrentPage(totalPages)
    }
  }

  function getTotalPages(): number {
    return Math.ceil(participants.length / ITEMS_PER_PAGE)
  }

  function shouldDisplayPagination(): boolean {
    return getTotalPages() > 1
  }

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
          <div>
            <table>
              <thead>
                <tr>
                  <th>incidente</th>
                  <th>cargo</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((participant) => (
                  <tr key={participant.id}>
                    <td>
                      <Link
                        to={`/editParticipant/${participant.id}`}
                        onClick={(): void => setIsActive(9)}
                      >
                        {participant.name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/editParticipant/${participant.id}`}
                        onClick={(): void => setIsActive(9)}
                      >
                        {participant.position}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {shouldDisplayPagination() && (
              <div className="pagination">
                <button onClick={goToPrevPage} disabled={currentPage === 1}>
                  Anterior
                </button>
                <span>
                  Página {currentPage} de {getTotalPages()}
                </span>
                <button onClick={goToNextPage} disabled={currentPage >= getTotalPages()}>
                  Próxima
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Participants
