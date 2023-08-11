import { SetStateAction, useEffect, useState } from 'react'
import './styles.sass'

import db from '../../database'
import { Link } from 'react-router-dom'

type IncidentProps = {
  id?: number
  name: string
}

type MenuProps = {
  setIsActive: React.Dispatch<SetStateAction<number>>
}

function Incidents({ setIsActive }: MenuProps): JSX.Element {
  const ITEMS_PER_PAGE = 10

  const [incidents, setIncidents] = useState<IncidentProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchIncidents = async (): Promise<void> => {
      const incidents = await db.incidents.toArray()
      setIncidents(incidents as IncidentProps[])
    }

    fetchIncidents()
  }, [incidents])

  function getCurrentItems(): IncidentProps[] {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return incidents.slice(startIndex, endIndex)
  }

  function goToPrevPage(): void {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  function goToNextPage(): void {
    const totalPages = Math.ceil(incidents.length / ITEMS_PER_PAGE)
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    } else {
      setCurrentPage(totalPages)
    }
  }

  function getTotalPages(): number {
    return Math.ceil(incidents.length / ITEMS_PER_PAGE)
  }

  function shouldDisplayPagination(): boolean {
    return getTotalPages() > 1
  }

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
          <div>
            <table>
              <thead>
                <tr>
                  <th>incidente</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((incident) => (
                  <tr key={incident.id}>
                    <td>
                      <Link
                        to={`/editIncident/${incident.id}`}
                        onClick={(): void => setIsActive(9)}
                      >
                        {incident.name}
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

export default Incidents
