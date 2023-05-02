import { useState, ChangeEvent, useMemo, useContext } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Layout } from '@/components/layouts';
import { Entry, EntryStatus } from '@/interfaces';
import { dbEntries } from '@/database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}

const EntryPage: NextPage<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry } = useContext(EntriesContext);
    const router = useRouter();

    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setInputValue(target.value);
    }

    const onStatusChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setStatus(target.value as EntryStatus)
    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(updatedEntry, true);
    }

    const onDelete = () => {

        deleteEntry(entry._id);
        router.push('/');
    }

    const inputCondition = useMemo(() => inputValue.length <= 0 && touched, [inputValue.length, touched])

    return (
        <Layout title={inputValue.substring(0, 20) + (inputValue.length > 20 ? '...' : '')}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entry:`}
                            subheader={`Created ${ dateFunctions.dateToNow( entry.createdAt ) } ago`}
                        />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='New Entry'
                                autoFocus
                                multiline
                                label="New Entry"
                                helperText={inputCondition && 'Enter a value'}
                                error={inputCondition}
                                onBlur={() => setTouched(true)}
                                value={inputValue}
                                onChange={onInputChange}
                            />

                            {/* RADIO */}
                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                            
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.main',
                }}
                onClick={ onDelete }
            >
                <DeleteForeverOutlinedIcon />
            </IconButton>
        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id)
    console.log(entry)

    // If ID is not a valid Mongo ID, entry will be null. Then just redirect and avoid to render the page.
    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;