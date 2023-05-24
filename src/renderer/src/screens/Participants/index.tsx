import './styles.sass'

function Participants(): JSX.Element {
  return (
    <main className="participants">
      <div className="row">
        <h3>Cadastrar Participantes</h3>
        <div>
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Cargo" />
          <button>cadastrar</button>
        </div>
      </div>
    </main>
  )
}

export default Participants
