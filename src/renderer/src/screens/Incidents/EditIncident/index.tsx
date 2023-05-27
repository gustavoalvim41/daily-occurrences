import { useEffect, useState } from 'react'
import './styles.sass'

import db from '../../../database'
import { useParams, useNavigate } from 'react-router-dom'

type IncidentProps = {
  id?: number
  name: string
}

function EditIncident(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const [incident, setIncident] = useState<IncidentProps | null>(null)
  const [editedName, setEditedName] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchItem(): Promise<void> {
      if (id) {
        const foundItem = await db.incidents.get(+id)
        if (foundItem !== undefined) {
          setIncident(foundItem)
          setEditedName(foundItem.name)
        }
      }
    }
    fetchItem()
  }, [id])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEditedName(event.target.value)
  }

  async function handleEditClick(): Promise<void> {
    if (incident) {
      const updatedIncident = { ...incident, name: editedName }
      await db.incidents.update(incident.id as number, updatedIncident)
      setIncident(updatedIncident)
      navigate('/incidents')
    }
  }

  return (
    <main className="editIncident">
      <div className="row">
        <input
          type="text"
          value={editedName}
          onChange={handleInputChange}
          placeholder="Novo Incidente"
        />
        <div>
          <button onClick={handleEditClick}>editar</button>
        </div>
      </div>
    </main>
  )
}

export default EditIncident
