import { useEffect, useState } from 'react'
import './styles.sass'
import db from '@renderer/database'
import { useNavigate } from 'react-router-dom'

function RegisterOccurrences(): JSX.Element {
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedDate(event.target.value)
  }

  function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedTime(event.target.value)
  }

  const [selectedParticipantOne, setSelectedParticipantOne] = useState('')
  const [selectedParticipantTwo, setSelectedParticipantTwo] = useState('')

  function handleParticipantOneChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedParticipantOne(event.target.value)
  }

  function handleParticipantTwoChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedParticipantTwo(event.target.value)
  }

  const [selectedIncident, setSelectedIncident] = useState('')

  function handleSelectIncidentChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedIncident(event.target.value)
  }

  const [selectedAddress, setSelectedAddress] = useState('')

  function handleAddressChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedAddress(event.target.value)
  }

  const [selectedReceipt, setSelectedReceipt] = useState('')

  function handleSelectReceiptChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedReceipt(event.target.value)
  }

  const [selectedSituation, setSelectedSituation] = useState('')

  function handleSelectSituationChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setSelectedSituation(event.target.value)
  }

  const [selectedObservation, setSelectedObservation] = useState('')

  function handledObservationChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setSelectedObservation(event.target.value)
  }

  function clearInputs(): void {
    setSelectedDate('')
    setSelectedTime('')
    setSelectedParticipantOne('')
    setSelectedParticipantTwo('')
    setSelectedIncident('')
    setSelectedAddress('')
    setSelectedReceipt('')
    setSelectedSituation('')
    setSelectedObservation('')
  }

  function handleRegister(): void {
    if (selectedParticipantOne === selectedParticipantTwo) {
      return
    }

    if (
      selectedDate !== '' &&
      selectedTime !== '' &&
      selectedParticipantOne !== '' &&
      selectedParticipantTwo !== '' &&
      selectedIncident !== '' &&
      selectedAddress !== '' &&
      selectedReceipt !== '' &&
      selectedSituation !== '' &&
      selectedObservation !== ''
    ) {
      db.occurrences.add({
        date: selectedDate,
        time: selectedTime,
        participantOne: selectedParticipantOne.toLowerCase(),
        participantTwo: selectedParticipantTwo.toLowerCase(),
        incident: selectedIncident.toLowerCase(),
        address: selectedAddress.toLowerCase(),
        receipt: selectedReceipt.toLowerCase(),
        situation: selectedSituation.toLowerCase(),
        observation: selectedObservation.toLowerCase()
      })
    }
    clearInputs()
    navigate('/occurrences')
  }

  type IncidentProps = {
    id?: number
    name: string
  }

  const [incidents, setIncidents] = useState<IncidentProps[]>([])

  useEffect(() => {
    async function fetchOccurrences(): Promise<void> {
      const incidents = await db.incidents.toArray()
      setIncidents(incidents as IncidentProps[])
    }

    fetchOccurrences()
  }, [incidents])

  type ParticipantsProps = {
    id?: number
    name: string
    position: string
  }

  const [participants, setParticipants] = useState<ParticipantsProps[]>([])

  useEffect(() => {
    async function fetchOccurrences(): Promise<void> {
      const participants = await db.participants.toArray()
      setParticipants(participants as ParticipantsProps[])
    }

    fetchOccurrences()
  }, [participants])

  return (
    <main className="registerOccurrences">
      <div className="form">
        <div className="row">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <input type="time" value={selectedTime} onChange={handleTimeChange} />
        </div>
        <div className="row">
          <select
            className="input"
            value={selectedParticipantOne}
            onChange={handleParticipantOneChange}
          >
            <option>Participante 1</option>
            {participants.map((participant) => (
              <option key={participant.id}>
                {participant.name + ` (${participant.position})`}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <select
            className="input"
            value={selectedParticipantTwo}
            onChange={handleParticipantTwoChange}
          >
            <option>Participante 2</option>
            {participants.map((participant) => (
              <option key={participant.id}>
                {participant.name + ` (${participant.position})`}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <select className="input" value={selectedIncident} onChange={handleSelectIncidentChange}>
            <option>Incidente</option>
            {incidents.map((incident) => (
              <option key={incident.id} value={incident.name}>
                {incident.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <input
            className="input"
            type="text"
            placeholder="Endereço"
            value={selectedAddress}
            onChange={handleAddressChange}
          />
        </div>
        <div className="row">
          <select className="input" value={selectedReceipt} onChange={handleSelectReceiptChange}>
            <option>Recebimento Via</option>
            <option value="Via Cobom">Via Cobom</option>
            <option value="Via Plantão">Via Plantão</option>
            <option value="Via Ouvidoria">Via Ouvidoria</option>
          </select>
        </div>
        <div className="row">
          <select
            className="input"
            value={selectedSituation}
            onChange={handleSelectSituationChange}
          >
            <option>Situação</option>
            <option value="finalizado">finalizado</option>
            <option value="aguardando">aguardando</option>
            <option value="reagendado">reagendado</option>
            <option value="sem contato">sem contato</option>
          </select>
        </div>
        <div className="row">
          <textarea
            className="textarea"
            placeholder="Observação"
            cols={5}
            rows={10}
            maxLength={174}
            value={selectedObservation}
            onChange={handledObservationChange}
          ></textarea>
        </div>
        <div className="row">
          <button onClick={handleRegister}>cadastrar</button>
        </div>
      </div>
    </main>
  )
}

export default RegisterOccurrences
