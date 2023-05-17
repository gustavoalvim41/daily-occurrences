import { useState } from 'react'
import './styles.sass'

import Form from './components/Form'
import Alert from '../../components/Alert'

function Register(): JSX.Element {
  const [showAlertSucess, setShowAlertSucess] = useState<boolean>(false)
  const [showAlertError, setShowAlertError] = useState<boolean>(false)

  return (
    <div className="register">
      {showAlertSucess && <Alert type="sucess" mensage="Cadastro realizado com sucesso!" />}
      {showAlertError && <Alert type="error" mensage="Erro ao realizar o cadastro!" />}

      <Form setShowAlertSucess={setShowAlertSucess} setShowAlertError={setShowAlertError} />
    </div>
  )
}

export default Register
