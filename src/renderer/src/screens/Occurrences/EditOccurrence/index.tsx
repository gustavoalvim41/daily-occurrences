import { useEffect, useState } from 'react'
import './styles.sass'

import db from '../../../database'
import { useParams, useNavigate } from 'react-router-dom'

function EditOccurrence(): JSX.Element {
  const { id } = useParams<{ id: string }>()

  const [occurrence, setOccurrence] = useState<OccurrenceProps[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchOccurrences = async (): Promise<void> => {
      const occurrence = await db.occurrences.toArray()
      setOccurrence(occurrence as OccurrenceProps[])
    }

    fetchOccurrences()
  }, [occurrence])

  const [editedDate, setEditedDate] = useState('')

  function handleInputDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEditedDate(event.target.value)
  }

  const [editedTime, setEditedTime] = useState('')

  function handleInputTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEditedTime(event.target.value)
  }

  const [editedParticipantOne, setEditedParticipantOne] = useState('')

  function handleInputParticipantOneChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setEditedParticipantOne(event.target.value)
  }

  const [editedParticipantTwo, setEditedParticipantTwo] = useState('')

  function handleInputParticipantTwoChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setEditedParticipantTwo(event.target.value)
  }

  const [editedIncident, setEditedIncident] = useState('')

  function handleInputIncidentChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setEditedIncident(event.target.value)
  }

  const [editedAddress, setEditedAddress] = useState('')

  function handleInputAddressChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setEditedAddress(event.target.value)
  }

  const [editedReceipt, setEditedReceipt] = useState('')

  function handleInputReceiptChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setEditedReceipt(event.target.value)
  }

  const [editedSituation, setEditedSituation] = useState('')

  function handleInputSituationChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    setEditedSituation(event.target.value)
  }

  const [editedObservation, setEditedObservation] = useState('')

  function handleInputObservationChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setEditedObservation(event.target.value)
  }

  useEffect(() => {
    async function fetchItem(): Promise<void> {
      if (id) {
        const foundItem = await db.occurrences.get(+id)
        if (foundItem) {
          setEditedDate(foundItem.date)
          setEditedTime(foundItem.time)
          setEditedParticipantOne(foundItem.participantOne)
          setEditedParticipantTwo(foundItem.participantTwo)
          setEditedIncident(foundItem.incident)
          setEditedAddress(foundItem.address)
          setEditedReceipt(foundItem.receipt)
          setEditedSituation(foundItem.situation)
          setEditedObservation(foundItem.observation)
        }
      }
    }
    fetchItem()
  }, [id])

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

  type OccurrenceProps = {
    id: number
    date: string
    time: string
    participantOne: string
    participantTwo: string
    incident: string
    address: string
    situation: string
    observation: string
  }

  async function handleEditClick(): Promise<void> {
    if (editedParticipantOne === editedParticipantTwo) {
      return
    }
    if (occurrence.length > 0) {
      const updatedOccurrence = {
        ...occurrence[0],
        date: editedDate,
        time: editedTime,
        participantOne: editedParticipantOne,
        participantTwo: editedParticipantTwo,
        incident: editedIncident,
        address: editedAddress,
        situation: editedSituation,
        observation: editedObservation
      }
      await db.occurrences.update(occurrence[0].id, updatedOccurrence)
      setOccurrence([updatedOccurrence])
      navigate('/occurrences')
    }
  }

  return (
    <main className="editOccurrences">
      <div className="form">
        <div className="row">
          <input type="date" defaultValue={editedDate} onChange={handleInputDateChange} />
          <input type="time" defaultValue={editedTime} onChange={handleInputTimeChange} />
        </div>
        <div className="row">
          <select
            className="input"
            value={editedParticipantOne}
            onChange={handleInputParticipantOneChange}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.name + ` (${participant.position})`}>
                {participant.name + ` (${participant.position})`}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <select
            className="input"
            value={editedParticipantTwo}
            onChange={handleInputParticipantTwoChange}
          >
            {participants.map((participant) => (
              <option key={participant.id} value={participant.name + ` (${participant.position})`}>
                {participant.name + ` (${participant.position})`}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <select
            className="input"
            defaultValue={editedIncident}
            onChange={handleInputIncidentChange}
          >
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
            defaultValue={editedAddress}
            onChange={handleInputAddressChange}
            placeholder="Endereço"
          />
        </div>
        <div className="row">
          <select
            className="input"
            defaultValue={editedReceipt}
            onChange={handleInputReceiptChange}
          >
            <option value="Via Cobom">Via Cobom</option>
            <option value="Via Plantão">Via Plantão</option>
            <option value="Via Ouvidoria">Via Ouvidoria</option>
          </select>
        </div>
        <div className="row">
          <select
            className="input"
            defaultValue={editedSituation}
            onChange={handleInputSituationChange}
          >
            <option value="finalizado">finalizado</option>
            <option value="aguardando">aguardando</option>
            <option value="reagendado">reagendado</option>
            <option value="sem contato">sem contato</option>
          </select>
        </div>
        <div className="row">
          <textarea
            className="textarea"
            defaultValue={editedObservation}
            onChange={handleInputObservationChange}
            placeholder="Observação"
            cols={5}
            rows={10}
            maxLength={174}
          ></textarea>
        </div>
        <div className="row">
          <button onClick={handleEditClick}>editar</button>
        </div>
      </div>
    </main>
  )
}

export default EditOccurrence
