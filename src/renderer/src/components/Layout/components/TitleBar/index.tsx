import { ReactNode } from 'react'
import './styles.sass'

import { VscChromeMinimize, VscChromeMaximize, VscChromeClose } from 'react-icons/vsc'

type TitlebarButtonProps = {
  message: 'minimizeApp' | 'maximizeApp' | 'closeApp'
  children: ReactNode
}

function TitleBarButton({ message, children }: TitlebarButtonProps): JSX.Element {
  function sendMessage(): void {
    window.electron.ipcRenderer.send(message, [message])
  }
  return (
    <button className={message == 'closeApp' ? 'close' : ''} onClick={sendMessage}>
      {children}
    </button>
  )
}

function TitleBar(): JSX.Element {
  return (
    <div className="titlebar">
      <TitleBarButton message="minimizeApp">
        <VscChromeMinimize size={16} className="icon" />
      </TitleBarButton>
      <TitleBarButton message="maximizeApp">
        <VscChromeMaximize size={16} className="icon" />
      </TitleBarButton>
      <TitleBarButton message="closeApp">
        <VscChromeClose size={16} className="icon" />
      </TitleBarButton>
    </div>
  )
}

export default TitleBar
