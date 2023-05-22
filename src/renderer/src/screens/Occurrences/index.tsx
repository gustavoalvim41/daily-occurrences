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
        <Link to="/register" onClick={(): void => setIsActive(9)}>
          nova ocorrência
        </Link>
      </div>
      <div className="content">
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
                  <Link to={`/occurrences/${occurrence.id}`}>
                    {occurrence.date + ' ' + occurrence.time}
                  </Link>
                </td>
                <td>
                  <Link to={`/occurrences/${occurrence.id}`}>{occurrence.incident}</Link>
                </td>
                <td>
                  <Link to={`/occurrences/${occurrence.id}`}>{occurrence.address}</Link>
                </td>
                <td>
                  <Link to={`/occurrences/${occurrence.id}`}>{occurrence.situation}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Occurrences
