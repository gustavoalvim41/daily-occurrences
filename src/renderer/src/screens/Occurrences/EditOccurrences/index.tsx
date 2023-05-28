import { useEffect, useState } from 'react'
import './styles.sass'
import { useParams } from 'react-router-dom'
import db from '../../../database'

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

function EditOccurrences(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const [occurrence, setOccurrence] = useState<OccurrenceProps[]>([])

  useEffect(() => {
    async function fetchItem(): Promise<void> {
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
    <main className="editOccurrences">
      {occurrence?.map((occurrence) => (
        <div key={occurrence.id}>
          <p>{occurrence.date + ' ' + occurrence.time}</p>
          <p>{occurrence.participantOne + ', ' + occurrence.participantTwo}</p>
          <p>{occurrence.incident}</p>
          <p>{occurrence.address}</p>
          <p>{occurrence.receipt}</p>
          <p>{occurrence.situation}</p>
          <p>{occurrence.observation}</p>
        </div>
      ))}
    </main>
  )
}

export default EditOccurrences
