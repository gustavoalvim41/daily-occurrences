import './styles.sass'

import { Link } from 'react-router-dom'

function Menu(): JSX.Element {
  return (
    <div className="menu">
      <Link to="/">Home</Link>
      <Link to="/occurrences">Ocorrências</Link>
      <Link to="/settings">Configurações</Link>
    </div>
  )
}

export default Menu
