import { useState, useEffect, SetStateAction } from 'react'
import './styles.sass'
import db from '../../database'
import { Link } from 'react-router-dom'

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
  const [occurrences, setOccurrences] = useState<OccurrenceProps[]>([])

  useEffect(() => {
    const fetchOccurrences = async (): Promise<void> => {
      const occurrences = await db.occurrences.toArray()
      setOccurrences(occurrences as OccurrenceProps[])
    }

    fetchOccurrences()
  }, [occurrences])

  return (
    <main className="occurrences">
      <div className="head">
        <Link to="/registerOccurrences" onClick={(): void => setIsActive(9)}>
          nova ocorrência
        </Link>
      </div>
      <div className="content">
        {occurrences.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Não foi encontrado nenhuma ocorrência.</p>
        ) : (
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
              {occurrences.map((occurrence) => (
                <tr key={occurrence.id}>
                  <td>
                    <Link
                      to={`/editOccurrences/${occurrence.id}`}
                      onClick={(): void => setIsActive(9)}
                    >
                      {occurrence.date + ' ' + occurrence.time}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/editOccurrences/${occurrence.id}`}
                      onClick={(): void => setIsActive(9)}
                    >
                      {occurrence.incident}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/editOccurrences/${occurrence.id}`}
                      onClick={(): void => setIsActive(9)}
                    >
                      {occurrence.address}
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/editOccurrences/${occurrence.id}`}
                      onClick={(): void => setIsActive(9)}
                    >
                      {occurrence.situation}
                    </Link>
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

export default Occurrences
