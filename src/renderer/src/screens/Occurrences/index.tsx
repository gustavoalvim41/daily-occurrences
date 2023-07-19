import { useState, useEffect, SetStateAction } from 'react'
import './styles.sass'

import db from '../../database'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

type OccurrenceProps = {
  id?: number
  date: string
  time: string
  incident: string
  address: string
  situation: string
}

type MenuProps = {
  setIsActive: React.Dispatch<SetStateAction<number>>
}

function Occurrences({ setIsActive }: MenuProps): JSX.Element {
  const ITEMS_PER_PAGE = 10
  const MAX_PAGES = 6

  const [occurrences, setOccurrences] = useState<OccurrenceProps[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchOccurrences = async (): Promise<void> => {
      const occurrences = await db.occurrences.toArray()
      setOccurrences(occurrences as OccurrenceProps[])
    }

    fetchOccurrences()
  }, [occurrences])

  function getCurrentItems(): OccurrenceProps[] {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return occurrences.slice(startIndex, endIndex)
  }

  function goToPrevPage(): void {
    setCurrentPage((prevPage) => prevPage - 1)
  }

  function goToNextPage(): void {
    if (currentPage < MAX_PAGES) {
      setCurrentPage((prevPage) => prevPage + 1)
    } else {
      setCurrentPage(Math.ceil(occurrences.length / ITEMS_PER_PAGE))
    }
  }

  function getTotalPages(): number {
    return Math.ceil(occurrences.length / ITEMS_PER_PAGE)
  }

  function shouldDisplayPagination(): boolean {
    return getTotalPages() > 1
  }

  return (
    <main className="occurrences">
      <div className="head">
        <Link to="/registerOccurrences" onClick={(): void => setIsActive(9)}>
          nova ocorrência
        </Link>
      </div>
      <div className="content">
        {occurrences.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Nenhuma ocorrência foi encontrada.</p>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th>data</th>
                  <th>incidente</th>
                  <th>endereço</th>
                  <th>situação</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((occurrence) => (
                  <tr key={occurrence.id}>
                    <td>
                      <Link
                        to={`/editOccurrence/${occurrence.id}`}
                        onClick={(): void => setIsActive(9)}
                      >
                        {format(
                          new Date(`${occurrence.date}T${occurrence.time}`),
                          'dd/MM/yyyy - HH:mm'
                        )}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/editOccurrence/${occurrence.id}`}
                        onClick={(): void => setIsActive(9)}
                      >
                        {occurrence.incident}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/editOccurrence/${occurrence.id}`}
                        onClick={(): void => setIsActive(9)}
                      >
                        {occurrence.address}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/editOccurrence/${occurrence.id}`}
                        onClick={(): void => setIsActive(9)}
                      >
                        {occurrence.situation}
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

export default Occurrences
