import { useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/apis';

interface Props {
    children: JSX.Element;
}
export interface EntriesState {
    entries: Entry[];
}

const Entries_INITAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITAL_STATE);

    const addNewEntry = async ( description: string ) => { 

        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }

        const { data } = await entriesApi.post<Entry>( '/entries', {description} );

        dispatch( { type: '[Entries] - Add-Entry', payload: data } );

    }

    const updateEntry = async ( {_id, description, status}: Entry ) => {

        try {
            const { data } = await entriesApi.put<Entry>( `/entries/${ _id }`, { description, status } );

            dispatch({ type: '[Entries] - Entry-Updated', payload: data });
        } catch (error) {
            console.log(error);
        }

    }
    
    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: '[Entries] - Refresh-Data', payload: data})
        
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    
    
    return (
        <EntriesContext.Provider value={{
            ...state,


            //Methods
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}