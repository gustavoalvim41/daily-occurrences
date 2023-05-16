import { useState } from 'react'
import './styles.sass'
import { format } from 'date-fns'

function Register(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formattedDateTime, setFormattedDateTime] = useState('')

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(event.target.value)
    formatDateTime(event.target.value, selectedTime)
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedTime(event.target.value)
    formatDateTime(selectedDate, event.target.value)
  }

  const formatDateTime = (date: string, time: string): void => {
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

  const handleResponsibleOneChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedResponsibleOne(event.target.value)
  }

  const handleResponsibleTwoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedResponsibleTwo(event.target.value)
  }
  const handleRegister = (): void => {
    // Lógica para registrar os dados no banco de dados
    console.log(formattedDateTime)
    console.log(selectedResponsibleOne + ' x ' + selectedResponsibleTwo)
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
          <button onClick={handleRegister}>register</button>
        </div>
      </div>
    </div>
  )
}

export default Register
