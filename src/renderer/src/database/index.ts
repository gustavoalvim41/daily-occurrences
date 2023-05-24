import Dexie from 'dexie'

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

type IncidentProps = {
  id?: number
  name: string
}

type ParticipantProps = {
  id?: number
  name: string
  position: string
}

interface mydb extends Dexie {
  occurrences: Dexie.Table<OccurrenceProps, number>
  incidents: Dexie.Table<IncidentProps, number>
  participants: Dexie.Table<ParticipantProps, number>
}

const db = new Dexie('occurrences') as mydb
db.version(3).stores({
  occurrences:
    '++id, date, time, participantOne, participantTwo, incident, address, receipt, situation, observation',
  incidents: '++id, name',
  participants: '++id, name, position'
})

export default db
