import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '@/context/entries';
import { UIContext } from '@/context/ui';

export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext );
    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext )

    // const [isAdding, setIsAdding] = useState(false);
    const [touched, setTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const onInputChange = ( {target}: ChangeEvent<HTMLInputElement> ) => { 
        setInputValue(target.value);
    }

    const onSave = () => { 
        console.log('guardando')
        if ( inputValue.length === 0 ) return;
        
        addNewEntry( inputValue );
        setInputValue('');
        setIsAddingEntry(false);
        setTouched(false);
    }

    const onCancel = () => {
        setIsAddingEntry(false);
        setTouched(false);
    }
    
    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {
                isAddingEntry
                    ? (
                        <>
                            <TextField
                                fullWidth
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                placeholder="New Entry"
                                autoFocus
                                multiline
                                label='New Entry'
                                helperText={ touched && inputValue.length <= 0 && 'Ingrese un valor' }
                                value={ inputValue }
                                error={ touched && inputValue.length <= 0 }
                                onChange={ onInputChange }
                                onBlur={ () => setTouched(true) }
                            />
                            <Box display='flex' justifyContent='space-between'>
                                <Button
                                    variant='text'
                                    onMouseDown={onCancel}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type='button'
                                    variant='outlined'
                                    color='secondary'
                                    startIcon={<SaveOutlinedIcon />}
                                    onClick={ onSave }
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    )
                    : (
                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={ () => setIsAddingEntry(true) }
                        >
                            Add Task
                        </Button>
                    )
            }
        </Box>
    )
}
