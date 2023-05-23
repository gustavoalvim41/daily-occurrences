import './styles.sass'

function Settings(): JSX.Element {
  return (
    <main className="settings">
      <div className="row">
        <h3>Cadastrar Participantes</h3>
        <div>
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Cargo" />
          <button>cadastrar</button>
        </div>
      </div>

      <div className="row">
        <h3>Cadastrar Incidentes</h3>
        <div>
          <input type="text" placeholder="Novo Incidente" />
          <button>cadastrar</button>
        </div>
      </div>
    </main>
  )
}

export default Settings
