import { ReactNode } from 'react'
import './styles.sass'

import TitleBar from './components/TitleBar'
import Menu from './components/Menu'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="layout">
      <TitleBar />

      <div className="structure">
        <Menu />

        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
