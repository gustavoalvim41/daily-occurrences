import './styles.sass'

import { Link } from 'react-router-dom'

function Menu(): JSX.Element {
  return (
    <div className="menu">
      <Link to="/">home</Link>
      <Link to="/occurrences">ocorrências</Link>
      <Link to="/settings">configurações</Link>
    </div>
  )
}

export default Menu
