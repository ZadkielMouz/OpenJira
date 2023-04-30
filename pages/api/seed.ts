import { db, seedData } from '@/database'
import { Entry } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    // This condition avoid that we purge the db using this endpoint in production
    if( process.env.NODE_ENV === 'production' ) {
        return res.status(401).json({ message: "You can't access this service" })
    }

    await db.connect();

    await Entry.deleteMany()
    await Entry.insertMany( seedData.entries )
    
    await db.disconnect();


    res.status(200).json({ message: 'Process finished succesfully' })
}