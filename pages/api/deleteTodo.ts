import { withApiAuthRequired } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import { table } from './utils/airtable'

const deleteTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body
  try {
    const deletedRecord = await table.destroy([id])
    res.statusCode = 200
    res.json(deletedRecord)
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.json({ msg: 'Something went wrong' })
  }
}

export default withApiAuthRequired(deleteTodo)
