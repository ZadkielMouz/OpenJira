import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { Entry, IEntry } from '@/models';
import { db } from '@/database';

type Data = 
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;
    
    if ( !mongoose.isValidObjectId( id ) ) {
        return res.status(400).json({ message: `${id} is not a valid ID` })
    }

    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res );
        
        case 'GET':
            return getEntry( req, res );
        
        case 'DELETE':
            return deleteEntry( req, res );
    
        default:
            return res.status(400).json({ message: 'Method not valid' });
    }
}

const getEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();
    const resEntry = await Entry.findById( id );
    await db.disconnect()

    if( !resEntry ) {
        return res.status(400).json({ message: `This ID: {id: ${ id }} doesn't exist in the database` })
    }

    return res.status(200).json( resEntry );
}

const updateEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: `There is no entry with this ID: ${id}`});
    }

    // This endpoint will act in order to change description or the status when we drag-and-drop the entry
    // If we get description or status from the request, we will use that. If not, then will use the entryToUpdate data.

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    // findByIdAndUpdate will need the id as first parameter, the data that we want to update
    // The last parameter is not required, but will run some configurations
    // runValidators will run the validation in the status enum that we defined in the Entry model, and 'new' will return the updated data

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, {runValidators: true, new: true });
        await db.disconnect()
        res.status(200).json( updatedEntry! ); // The ! indicates Typescript that always will be an Entry
    } catch (error: any) {
        console.log(error)
        await db.disconnect();
        res.status(400).json({ message: error.erros.status.message })
    }

}

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { id } = req.query;

    await db.connect();

    if ( !await Entry.findById( id ) ) {
        await db.disconnect();
        return res.status(400).json({ message: `There is no entry with this ID: ${id}`});
    }


    try {
        await Entry.findByIdAndDelete( id )
        await db.disconnect();
        res.status(200).json({ message: 'Entry deleted Sucessfully'});

    } catch (error: any ) {
        console.log(error)
        await db.disconnect();
        res.status(400).json({ message: error.erros.status.message });
    } 

}