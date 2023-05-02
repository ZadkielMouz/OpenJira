import { useReducer } from 'react';
import { useSnackbar } from 'notistack';
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

    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description });

        dispatch({ type: '[Entries] - Add-Entry', payload: data });

    }

    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {

        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });

            dispatch({ type: '[Entries] - Entry-Updated', payload: data });

            if (showSnackbar) {
                enqueueSnackbar('Entry updated Successfully!', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }

    }

    const deleteEntry = async (id: string) => {

        try {
            const { data } = await entriesApi.delete<{ message: string }>(`/entries/${id}`);

            await refreshEntries();

            enqueueSnackbar(data.message, {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        } catch (error) {
            console.log(error)
        }

    }

    const refreshEntries = async () => {

        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entries] - Refresh-Data', payload: data });

    }

    return (
        <EntriesContext.Provider value={{
            ...state,


            //Methods
            addNewEntry,
            updateEntry,
            refreshEntries,
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}