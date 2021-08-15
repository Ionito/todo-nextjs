import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { table } from './utils/airtable'

const editTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, completed, title } = req.body
  try {
    const newFields = { title, completed }
    const editedRecord = await table.update([{ id, fields: newFields }])
    res.statusCode = 200
    res.json(editedRecord)
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Something went wrong' })
  }
}

export default withApiAuthRequired(editTodo)
