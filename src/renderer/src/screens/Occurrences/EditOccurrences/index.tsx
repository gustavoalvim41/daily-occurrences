// import { useEffect, useState } from 'react'
import './styles.sass'
// import { useParams } from 'react-router-dom'
// import db from '../../../database'

// type OccurrenceProps = {
//   id?: number
//   date: string
//   time: string
//   participantOne: string
//   participantTwo: string
//   incident: string
//   address: string
//   receipt: string
//   situation: string
//   observation: string
// }

function EditOccurrences(): JSX.Element {
  // const { id } = useParams<{ id: string }>()

  // // const [occurrence, setOccurrence] = useState<OccurrenceProps[]>([])

  // // useEffect(() => {
  // //   async function fetchItem(): Promise<void> {
  // //     if (id) {
  // //       const foundItem = await db.occurrences.get(+id)
  // //       if (foundItem) {
  // //         setOccurrence([foundItem])
  // //       }
  // //     }
  // //   }
  // //   fetchItem()
  // // }, [id])

  return (
    <main className="editOccurrences">
      <div className="form">
        <div className="row">
          <input type="date" />
          <input type="time" />
        </div>
        <div className="row">
          <select className="input">
            <option>Participante 1</option>
          </select>
        </div>
        <div className="row">
          <select className="input">
            <option>Participante 2</option>
          </select>
        </div>
        <div className="row">
          <select className="input">
            <option>Incidente</option>
          </select>
        </div>
        <div className="row">
          <input className="input" type="text" placeholder="Endereço" />
        </div>
        <div className="row">
          <select className="input">
            <option>Recebimento Via</option>
            <option value="Via Cobom">Via Cobom</option>
            <option value="Via Plantão">Via Plantão</option>
            <option value="Via Ouvidoria">Via Ouvidoria</option>
          </select>
        </div>
        <div className="row">
          <select className="input">
            <option>Situação</option>
            <option value="finalizado">finalizado</option>
            <option value="aguardando">aguardando</option>
            <option value="reagendado">reagendado</option>
            <option value="sem contato">sem contato</option>
          </select>
        </div>
        <div className="row">
          <textarea
            className="textarea"
            placeholder="Observação"
            cols={5}
            rows={10}
            maxLength={174}
          ></textarea>
        </div>
        <div className="row">
          <button>editar</button>
        </div>
      </div>
    </main>
  )
}

export default EditOccurrences
