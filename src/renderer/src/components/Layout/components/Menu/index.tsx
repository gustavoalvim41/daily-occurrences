import { SetStateAction } from 'react'
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
  },
  {
    route: '/settings',
    title: 'cadastros'
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

type MenuProps = {
  isActive: number
  setIsActive: React.Dispatch<SetStateAction<number>>
}

function Menu({ isActive, setIsActive }: MenuProps): JSX.Element {
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
