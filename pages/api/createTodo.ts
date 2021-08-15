import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { table } from './utils/airtable'

const createTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, user_id } = req.body
  try {
    const createdRecords = await table.create([{ fields: { title, user_id } }])
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

export default withApiAuthRequired(createTodo)
