import './styles.sass'

type AlertProps = {
  type: 'error' | 'sucess'
  mensage: string
  onClick: () => void
}

function Alert({ type, mensage, onClick }: AlertProps): JSX.Element {
  return (
    <div className={type == 'error' ? 'alert error' : 'alert sucess'}>
      <button onClick={onClick}>fechar</button>
      <p>{mensage}</p>
    </div>
  )
}

export default Alert
