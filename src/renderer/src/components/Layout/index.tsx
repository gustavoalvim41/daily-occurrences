import { ReactNode, useState } from 'react'
import './styles.sass'

import TitleBar from './components/TitleBar'
import Menu from './components/Menu'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps): JSX.Element {
  const [isActive, setIsActive] = useState(0)

  return (
    <div className="layout">
      <TitleBar />

      <div className="structure">
        <Menu isActive={isActive} setIsActive={setIsActive} />

        {children}
      </div>
    </div>
  )
}

export default Layout
