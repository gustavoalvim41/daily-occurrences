import './styles.sass'

type AlertProps = {
  type: 'error' | 'sucess'
  mensage: string
}

function Alert({ type, mensage }: AlertProps): JSX.Element {
  return (
    <div className={type == 'error' ? 'alert error' : 'alert sucess'}>
      <p>{mensage}</p>
    </div>
  )
}

export default Alert
