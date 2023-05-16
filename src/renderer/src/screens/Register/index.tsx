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

  const handleRegister = (): void => {
    // Lógica para registrar os dados no banco de dados
    console.log(formattedDateTime)
  }

  return (
    <div className="register">
      <div className="form">
        <div className="row">
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </div>
        <div className="row">
          <input type="time" value={selectedTime} onChange={handleTimeChange} />
        </div>
        <div className="row">
          <button onClick={handleRegister}>register</button>
        </div>
      </div>
    </div>
  )
}

export default Register
