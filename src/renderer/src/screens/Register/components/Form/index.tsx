import { useEffect, useState } from 'react'
import './styles.sass'

import db from '../../../../database'

type FormProps = {
  setShowAlertSucess: React.Dispatch<React.SetStateAction<boolean>>
  setShowAlertError: React.Dispatch<React.SetStateAction<boolean>>
}

function Form({ setShowAlertSucess, setShowAlertError }: FormProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const data = event.target.value
    setSelectedDate(data)
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

  const handleSelectIncidentChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedIncident(event.target.value)
  }

  const [selectedAddress, setSelectedAddress] = useState('')

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedAddress(event.target.value)
  }

  const [selectedReceipt, setSelectedReceipt] = useState('')

  const handleSelectReceiptChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedReceipt(event.target.value)
  }

  const [selectedSituation, setSelectedSituation] = useState('')

  const handleSelectSituationChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedSituation(event.target.value)
  }

  const [selectedObservation, setSelecteddObservation] = useState('')

  const handledObservationChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setSelecteddObservation(event.target.value)
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
    setSelecteddObservation('')
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
      selectedSituation !== ''
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
      setShowAlertSucess(true)
      setInterval(() => {
        setShowAlertSucess(false)
      }, 3000)
    } else {
      setShowAlertError(true)
      setInterval(() => {
        setShowAlertError(false)
      }, 3000)
    }
    clearInputs()
  }

  type IncidentProps = {
    id?: number
    name: string
  }

  const [incidents, setIncidents] = useState<IncidentProps[]>([])

  useEffect(() => {
    const fetchOccurrences = async (): Promise<void> => {
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
    const fetchOccurrences = async (): Promise<void> => {
      const participants = await db.participants.toArray()
      setParticipants(participants as ParticipantsProps[])
    }

    fetchOccurrences()
  }, [incidents])

  return (
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
            <option key={participant.id} value={participant.name}>
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
            <option key={participant.id} value={participant.name}>
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
        <select className="input" value={selectedSituation} onChange={handleSelectSituationChange}>
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
  )
}

export default Form
