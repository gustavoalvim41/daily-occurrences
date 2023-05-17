import Dexie from 'dexie'

interface mydb extends Dexie {
  occurrences: Dexie.Table<OccurrenceProps, number>
}

type OccurrenceProps = {
  id?: number
  date: string
  responsibleOne: string
  responsibleTwo: string
  incident: string
  address: string
  receipt: string
  situation: string
}

const db = new Dexie('daily-occurrences') as mydb
db.version(2).stores({
  occurrences: '++id, date, responsibleOne, responsibleTwo, incident, address, receipt, situation'
})

export default db
