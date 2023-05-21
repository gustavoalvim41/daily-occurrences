import { useParams } from 'react-router-dom'
import './styles.sass'

function Edit(): JSX.Element {
  const { id } = useParams()

  return (
    <div className="edit">
      <p>Seu ID: {id}</p>
    </div>
  )
}

export default Edit
