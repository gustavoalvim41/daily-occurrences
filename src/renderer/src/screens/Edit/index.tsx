import { useEffect, useState } from 'react'
import './styles.sass'
import { useParams } from 'react-router-dom'
import db from '../../database'

type OccurrenceProps = {
  id?: number
  date: string
  time: string
  participantOne: string
  participantTwo: string
  incident: string
  address: string
  receipt: string
  situation: string
  observation: string
}

function Edit(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const [occurrence, setOccurrence] = useState<OccurrenceProps[]>([])

  useEffect(() => {
    const fetchItem = async (): Promise<void> => {
      if (id) {
        const foundItem = await db.occurrences.get(+id)
        if (foundItem) {
          setOccurrence([foundItem])
        }
      }
    }

    fetchItem()
  }, [id])

  return (
    <div className="edit">
      {occurrence?.map((occurrence) => (
        <div key={occurrence.id}>
          <p>{occurrence.date + ' ' + occurrence.time}</p>
          <p>{occurrence.incident}</p>
          <p>{occurrence.address}</p>
          <p>{occurrence.situation}</p>
        </div>
      ))}
    </div>
  )
}

export default Edit
