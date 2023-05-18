import { useState } from 'react'
import './styles.sass'

import { format } from 'date-fns'

import db from '../../../../database'

type FormProps = {
  setShowAlertSucess: React.Dispatch<React.SetStateAction<boolean>>
  setShowAlertError: React.Dispatch<React.SetStateAction<boolean>>
}

function Form({ setShowAlertSucess, setShowAlertError }: FormProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formattedDateTime, setFormattedDateTime] = useState('')

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedDate(event.target.value)
    formatDateTime(event.target.value, selectedTime)
  }

  function handleTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedTime(event.target.value)
    formatDateTime(selectedDate, event.target.value)
  }

  function formatDateTime(date: string, time: string): void {
    if (date && time) {
      const dateTime = new Date(`${date}T${time}`)
      const formatted = format(dateTime, 'dd/MM/yyyy - HH:mm')
      setFormattedDateTime(formatted)
    } else {
      setFormattedDateTime('')
    }
  }

  const [selectedParticipantOne, setSelectedParticipantOne] = useState('')
  const [selectedParticipantTwo, setSelectedParticipantTwo] = useState('')

  function handleParticipantOneChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedParticipantOne(event.target.value)
  }

  function handleParticipantTwoChange(event: React.ChangeEvent<HTMLInputElement>): void {
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
    if (
      formattedDateTime !== '' &&
      selectedParticipantOne !== '' &&
      selectedParticipantTwo !== '' &&
      selectedIncident !== '' &&
      selectedAddress !== '' &&
      selectedReceipt !== '' &&
      selectedSituation !== ''
    ) {
      db.occurrences.add({
        date: formattedDateTime,
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
  return (
    <div className="form">
      <div className="row">
        <input type="date" value={selectedDate} onChange={handleDateChange} />
        <input type="time" value={selectedTime} onChange={handleTimeChange} />
      </div>
      <div className="row">
        <input
          type="text"
          placeholder="Participante 1"
          value={selectedParticipantOne}
          onChange={handleParticipantOneChange}
        />
      </div>
      <div className="row">
        <input
          type="text"
          placeholder="Participante 2"
          value={selectedParticipantTwo}
          onChange={handleParticipantTwoChange}
        />
      </div>
      <div className="row">
        <select value={selectedIncident} onChange={handleSelectIncidentChange}>
          <option>Incidente</option>
          <option value="corte de árvore">corte de árvore</option>
          <option value="fogo em residência">fogo em residência</option>
          <option value="fogo em estabelecimento">fogo em estabelecimento</option>
          <option value="fogo em vegetação">fogo em vegetação</option>
          <option value="óleo em via">óleo em via</option>
          <option value="inseto agressivo">inseto agressivo</option>
          <option value="animal em risco">animal em risco</option>
          <option value="isolamento de área">isolamento de área</option>
        </select>
      </div>
      <div className="row">
        <input
          type="text"
          placeholder="Endereço"
          value={selectedAddress}
          onChange={handleAddressChange}
        />
      </div>
      <div className="row">
        <select value={selectedReceipt} onChange={handleSelectReceiptChange}>
          <option>Recebimento Via</option>
          <option value="Via Cobom">Via Cobom</option>
          <option value="Via Plantão">Via Plantão</option>
        </select>
      </div>
      <div className="row">
        <select value={selectedSituation} onChange={handleSelectSituationChange}>
          <option>Situação</option>
          <option value="finalizado">finalizado</option>
          <option value="aguardando">aguardando</option>
          <option value="reagendado">reagendado</option>
          <option value="sem contato">sem contato</option>
        </select>
      </div>
      <div className="row">
        <textarea
          placeholder="Observação"
          cols={5}
          rows={10}
          maxLength={72}
          value={selectedObservation}
          onChange={handledObservationChange}
        ></textarea>
      </div>
      <div className="row">
        <button onClick={handleRegister}>register</button>
      </div>
    </div>
  )
}

export default Form
