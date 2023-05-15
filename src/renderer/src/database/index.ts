import Dexie from 'dexie'

interface mydb extends Dexie {
  occurrences: Dexie.Table<OccurrenceProps, number>
}

type OccurrenceProps = {
  id?: number
  date: string
  team: string
  type: string
  address: string
  receipt: string
  status: string
}

const db = new Dexie('daily-occurrences') as mydb
db.version(2).stores({
  occurrences: '++id, date, team, type, address, receipt, status'
})
/*
db.occurrences.add({
  date: '15/05',
  team: 'Person 1 And Person 2',
  type: 'Animal At Risk',
  address: 'New York, New York(NY), 10003',
  receipt: 'Via Cobom',
  status: 'Finished'
})
*/
export default db
