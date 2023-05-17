import { useState } from 'react'
import './styles.sass'

import { format } from 'date-fns'

import db from '../../database'

function Register(): JSX.Element {
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

  const [selectedResponsibleOne, setSelectedResponsibleOne] = useState('')
  const [selectedResponsibleTwo, setSelectedResponsibleTwo] = useState('')

  function handleResponsibleOneChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedResponsibleOne(event.target.value)
  }

  function handleResponsibleTwoChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setSelectedResponsibleTwo(event.target.value)
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
    setSelectedResponsibleOne('')
    setSelectedResponsibleTwo('')
    setSelectedIncident('')
    setSelectedAddress('')
    setSelectedReceipt('')
    setSelectedSituation('')
    setSelecteddObservation('')
  }

  function handleRegister(): void {
    if (
      formattedDateTime !== '' &&
      selectedResponsibleOne !== '' &&
      selectedResponsibleTwo !== '' &&
      selectedIncident !== '' &&
      selectedAddress !== '' &&
      selectedReceipt !== '' &&
      selectedSituation !== ''
    ) {
      db.occurrences.add({
        date: formattedDateTime,
        responsibleOne: selectedResponsibleOne.toLowerCase(),
        responsibleTwo: selectedResponsibleTwo.toLowerCase(),
        incident: selectedIncident.toLowerCase(),
        address: selectedAddress.toLowerCase(),
        receipt: selectedReceipt.toLowerCase(),
        situation: selectedSituation.toLowerCase(),
        observation: selectedObservation.toLowerCase()
      })
    }
    clearInputs()
  }

  return (
    <div className="register">
      <div className="form">
        <div className="row">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          <input type="time" value={selectedTime} onChange={handleTimeChange} />
        </div>
        <div className="row">
          <input
            type="text"
            placeholder="Responsável 1"
            value={selectedResponsibleOne}
            onChange={handleResponsibleOneChange}
          />
          <input
            type="text"
            placeholder="Responsável 2"
            value={selectedResponsibleTwo}
            onChange={handleResponsibleTwoChange}
          />
        </div>
        <div className="row">
          <select value={selectedIncident} onChange={handleSelectIncidentChange}>
            <option>Selecione um incidente...</option>
            <option value="Animal em Risco">Animal em Risco</option>
            <option value="Corte de Árvore">Corte de Árvore</option>
            <option value="Óleo em Via">Óleo em Via</option>
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
            <option>Selecione um recebimento...</option>
            <option value="Via Cobom">Via Cobom</option>
            <option value="Via Plantão">Via Plantão</option>
          </select>
          <select value={selectedSituation} onChange={handleSelectSituationChange}>
            <option>Selecione uma situação...</option>
            <option value="Finalizada">Finalizada</option>
            <option value="Aguardando">Aguardando</option>
          </select>
        </div>
        <div className="row">
          <textarea
            placeholder="obs..."
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
    </div>
  )
}

export default Register
