import { NextApiRequest, NextApiResponse } from 'next'
import { table } from './utils/airtable'

const createTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title } = req.body
  try {
    const createdRecords = await table.create([{ fields: { title } }])
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields,
    }
    res.statusCode = 200
    res.json(createdRecord)
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Something went wrong' })
  }
}

export default createTodo
