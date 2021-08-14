import Airtable from 'airtable'
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
})
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!)
const table = base(process.env.AIRTABLE_TABLE_NAME!)

const getMinifiedRecord = (record: any) => {
  if (!record.fields.completed) {
    record.fields.completed = false
  }
  return {
    id: record.id,
    ...record.fields,
  }
}

const minifyRecords = (records: any) => {
  return records.map((record: any) => getMinifiedRecord(record))
}

export { table, minifyRecords }
