import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | {message: string }
    | IEntry[]
    | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

    // Because we can handler different request type, we can use a switch selector
    switch( req.method ) {
        case 'GET':
            return getEntries( res );
        
        case 'POST':
            return postEntry( req, res );
        
        // If we get any request instead of 'GET', then return Bad Request
        default:
            return res.status(400).json({ message: "This endpoint doesn't exist" })
    }

}

const getEntries = async ( res: NextApiResponse<Data> ) => {

    // Connecting to the DB and get all the entries sorted
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' })
    await db.disconnect();

    // If everything is correct, then return status 200.
    res.status(200).json( entries );
}

const postEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    // We only need the description for the new Entry provided by the client
    // createdAt and status is data that shouldn't be available to the client

    const { description= '' } = req.body;

    // We only provided here the description that comes from the req.body and the createdAt that we insert
    // status is something that comes by default in the Mongo Schema in the file Entry.ts
    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    });

    try {

        await db.connect()
        await newEntry.save();
        await db.disconnect();

        // newEntry will have all the properties including the _id provided by MongoDB for this document
    
        return res.status(201).json( newEntry )
        
    } catch (error) {
        await db.disconnect();
        console.log(error);

        return res.status(500).json({ message: 'Something went wrong. Please check the server console for more information'});
    }

}