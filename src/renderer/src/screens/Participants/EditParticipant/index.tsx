import { useEffect, useState } from 'react'
import './styles.sass'

import db from '../../../database'
import { useNavigate, useParams } from 'react-router-dom'

type ParticipantsProps = {
  id?: number
  name: string
  position: string
}

function EditParticipant(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const [participant, setParticipant] = useState<ParticipantsProps | null>(null)
  const [editedName, setEditedName] = useState('')
  const [editedPosition, setEditedPosition] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchItem(): Promise<void> {
      if (id) {
        const foundItem = await db.participants.get(+id)
        if (foundItem !== undefined) {
          setParticipant(foundItem)
          setEditedName(foundItem.name)
          setEditedPosition(foundItem.position)
        }
      }
    }
    fetchItem()
  }, [id])

  function handleInputNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEditedName(event.target.value)
  }

  function handleInputPositionChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEditedPosition(event.target.value)
  }

  async function handleEditClick(): Promise<void> {
    if (participant) {
      const updatedParticipant = { ...participant, name: editedName, position: editedPosition }
      await db.participants.update(participant.id as number, updatedParticipant)
      setParticipant(updatedParticipant)
      navigate('/participants')
    }
  }
  return (
    <main className="editParticipant">
      <div className="row">
        <input type="text" placeholder="Nome" value={editedName} onChange={handleInputNameChange} />
        <input
          type="text"
          placeholder="Cargo"
          value={editedPosition}
          onChange={handleInputPositionChange}
        />
        <div>
          <button onClick={handleEditClick}>editar</button>
        </div>
      </div>
    </main>
  )
}

export default EditParticipant
