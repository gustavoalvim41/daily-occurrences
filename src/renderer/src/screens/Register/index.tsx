import { useState } from 'react'
import './styles.sass'

import Form from './components/Form'
import Alert from '../../components/Alert'

function Register(): JSX.Element {
  const [showAlertSucess, setShowAlertSucess] = useState<boolean>(false)
  const [showAlertError, setShowAlertError] = useState<boolean>(false)

  return (
    <main className="register">
      {showAlertSucess && (
        <Alert
          type="sucess"
          mensage="Cadastro realizado com sucesso!"
          onClick={(): void => setShowAlertSucess(false)}
        />
      )}
      {showAlertError && (
        <Alert
          type="error"
          mensage="Preencha todos os campos!"
          onClick={(): void => setShowAlertError(false)}
        />
      )}
      <Form setShowAlertSucess={setShowAlertSucess} setShowAlertError={setShowAlertError} />
    </main>
  )
}

export default Register
