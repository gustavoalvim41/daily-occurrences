import { SetStateAction, useState } from 'react'
import './styles.sass'

import { Link } from 'react-router-dom'

type NavListProps = {
  title: string
  route: string
  index: number
  isActive: number
  setIsActive: React.Dispatch<SetStateAction<number>>
}

const routes = [
  {
    route: '/',
    title: 'home'
  },
  {
    route: '/occurrences',
    title: 'ocorrências'
  }
]

function NavList({ route, title, index, setIsActive, isActive }: NavListProps): JSX.Element {
  return (
    <Link
      className={index == isActive ? 'active' : ''}
      to={route}
      onClick={(): void => setIsActive(index)}
    >
      {title}
    </Link>
  )
}

function Menu(): JSX.Element {
  const [isActive, setIsActive] = useState(0)

  return (
    <div className="menu">
      {routes.map((item, index) => (
        <NavList
          key={index}
          route={item.route}
          title={item.title}
          index={index}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      ))}
    </div>
  )
}

export default Menu
