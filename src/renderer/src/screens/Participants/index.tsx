import { useState } from 'react'
import './styles.sass'

import db from '../../database'

function Participants(): JSX.Element {
  const [selectedName, setSelectedName] = useState('')
  const [selectedPosition, setSelectedPosition] = useState('')

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value
    setSelectedName(data)
  }

  function handlePositionChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value
    setSelectedPosition(data)
  }

  function handleParticipantRegister(): void {
    if (selectedName !== '' && selectedPosition !== '') {
      db.participants.add({
        name: selectedName.toLowerCase(),
        position: selectedPosition.toLowerCase()
      })
      ClearInput()
    }
  }

  function ClearInput(): void {
    setSelectedName('')
    setSelectedPosition('')
  }

  return (
    <main className="participants">
      <div className="row">
        <input type="text" placeholder="Nome" value={selectedName} onChange={handleNameChange} />
        <input
          type="text"
          placeholder="Cargo"
          value={selectedPosition}
          onChange={handlePositionChange}
        />
        <div>
          <button onClick={handleParticipantRegister}>cadastrar</button>
        </div>
      </div>
    </main>
  )
}

export default Participants
