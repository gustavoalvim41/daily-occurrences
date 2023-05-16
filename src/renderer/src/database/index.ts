import Dexie from 'dexie'

interface mydb extends Dexie {
  occurrences: Dexie.Table<OccurrenceProps, number>
}

type OccurrenceProps = {
  id?: number
  date: string
  team: string
  incident: string
  address: string
  receipt: string
  situation: string
}

const db = new Dexie('daily-occurrences') as mydb
db.version(2).stores({
  occurrences: '++id, date, team, incident, address, receipt, situation'
})

export default db
