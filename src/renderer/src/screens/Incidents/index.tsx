import './styles.sass'

function Incidents(): JSX.Element {
  return (
    <main className="incidents">
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

export default Incidents
