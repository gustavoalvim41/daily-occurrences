import Dexie from 'dexie'

interface mydb extends Dexie {
  occurrences: Dexie.Table<OccurrenceProps, number>
}

type OccurrenceProps = {
  id?: number
  date: string
  time: string
  participantOne: string
  participantTwo: string
  incident: string
  address: string
  receipt: string
  situation: string
  observation: string
}

const db = new Dexie('occurrences') as mydb
db.version(3).stores({
  occurrences:
    '++id, date, time, participantOne, participantTwo, incident, address, receipt, situation, observation'
})

export default db
