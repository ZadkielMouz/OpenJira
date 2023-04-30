import { NextPage } from 'next';
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { Layout } from '@/components/layouts';
import { EntryList, NewEntry } from '@/components/ui';

const HomePage: NextPage = () => {

	return (
		<Layout title='Home - OpenJira'>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px)' }}>
						<CardHeader title="Pending" />
						{/* <CardContent> */}
						{/* Agregar una nueva entrada */}
						<NewEntry />
						{/* Listado de las entradas */}
						<EntryList status='pending' />
						{/* </CardContent> */}
					</Card>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px)' }}>
						<CardHeader title="In Progress" />
						<EntryList status='in-progress' />
					</Card>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Card sx={{ height: 'calc(100vh - 100px)' }}>
						<CardHeader title="Finished" />
						<EntryList status='finished' />
					</Card>
				</Grid>
			</Grid>
		</Layout>
	)
}

export default HomePage;