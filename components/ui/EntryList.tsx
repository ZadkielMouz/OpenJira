import { useContext, useMemo, DragEvent } from 'react';
import { List, Paper } from '@mui/material';
import { EntryCard } from './EntryCard';
import { Entry, EntryStatus } from '@/interfaces';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus;
}

export const EntryList = ({status}: Props) => {
    const { entries, updateEntry } = useContext( EntriesContext );
    const { isDragging, endDragging } = useContext( UIContext );

    const entriesByStatus = useMemo<Entry[]>(() => entries.filter( entry => entry.status === status ), [ entries ]);

    const onDropEntry = ( event: DragEvent ) => {
        const id = event.dataTransfer.getData('text');
        
        const entry = entries.find( e => e._id === id )!; // This ! simbol indicates Typescript that always will return an Entry and never will be undefined
        updateEntry( { ...entry, status } );
        endDragging();
    }

    const allowDrop = ( event: DragEvent ) => {
        event.preventDefault();
    }

    return (
        <div
            className={ isDragging ? styles.dragging : '' }
            onDrop={ onDropEntry }
            onDragOver={ allowDrop }
            onDragEnd={ endDragging }
        >
            <Paper
                sx={{ 
                    height: status === 'pending' ? 'calc(100vh - 252px)' : 'calc(100vh - 200px)',
                    overflow: 'auto',
                    backgroundColor: 'transparent',
                    padding: 1
                }}
                
            >

                {/* This will change depending if I am dragging or not */}
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={ entry } />
                        ))
                    }
                </List>

                {
                    isDragging && <NoteAddOutlinedIcon sx={{width: '100%', height: '80px'}} />
                }
            </Paper>
        </div>
    )
}
