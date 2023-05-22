import { ReactNode, SetStateAction } from 'react'
import './styles.sass'

import TitleBar from './components/TitleBar'
import Menu from './components/Menu'

type LayoutProps = {
  children: ReactNode
  isActive: number
  setIsActive: React.Dispatch<SetStateAction<number>>
}

function Layout({ children, isActive, setIsActive }: LayoutProps): JSX.Element {
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
