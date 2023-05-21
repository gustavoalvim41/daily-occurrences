import { useState, useEffect } from 'react'
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

function Occurrences(): JSX.Element {
  const [occurrences, setOccurrences] = useState<OccurrenceProps[]>([])

  useEffect(() => {
    const fetchOccurrences = async (): Promise<void> => {
      const occurrences = await db.occurrences.toArray()
      setOccurrences(occurrences as OccurrenceProps[])
    }

    fetchOccurrences()
  }, [occurrences])

  return (
    <div className="occurrences">
      <div className="head">
        <Link to="/register">nova ocorrência</Link>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>data</th>
              <th>incidente</th>
              <th>endereço</th>
              <th>situação</th>
              <th>mais</th>
            </tr>
          </thead>
          <tbody>
            {occurrences.map((occurrence) => (
              <tr key={occurrence.id}>
                <td>{occurrence.date + ' ' + occurrence.time}</td>
                <td>{occurrence.incident}</td>
                <td>{occurrence.address}</td>
                <td>{occurrence.situation}</td>
                <td>
                  <Link to={`/occurrences/${occurrence.id}`}>mais</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Occurrences
