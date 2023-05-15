import { useState, useEffect } from 'react'
import './styles.sass'
import db from '../../database'

type OccurrenceProps = {
  id: number
  date: string
  team: string
  type: string
  address: string
  receipt: string
  status: string
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
        <a>New Occurrences</a>
      </div>
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>date</th>
              <th>team</th>
              <th>type</th>
              <th>address</th>
              <th>receipt</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {occurrences.map((occurrence) => (
              <tr key={occurrence.id}>
                <td>{occurrence.date}</td>
                <td>{occurrence.team}</td>
                <td>{occurrence.type}</td>
                <td>{occurrence.address}</td>
                <td>{occurrence.receipt}</td>
                <td>{occurrence.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Occurrences
