import './styles.sass'

import { Link } from 'react-router-dom'

function Menu(): JSX.Element {
  return (
    <div className="menu">
      <Link to="/">Home</Link>
      <Link to="/settings">Settings</Link>
    </div>
  )
}

export default Menu
