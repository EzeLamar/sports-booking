import Link from 'next/link';
import React from 'react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Court } from '@/app/(my-app)/components/Courts/CourtSettings/CourtSettings';
import { Goal } from 'lucide-react';

type Props = {
	court: Court;
};

function CourtCard({ court }: Props) {
	return (
		<Card className='md:w-96'>
			<CardHeader>
				<CardTitle className='flex gap-2'>
					<Goal />
					{court.name}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-2'>
				<div>{court.address}</div>
				<div className='text-primary text-sm'>
					{court.availableDays.join(', ')}
				</div>
				<div>{`${court.openHour} - ${court.closeHour} hs`}</div>
				<p>{`Partido x hora: $${court.matchPerHour}`}</p>
				<p>{`Clase x hora: $${court.classPerHour}`}</p>
				<p>{`Torneo x hora: $${court.tournamentPerHour}`}</p>
			</CardContent>
			<CardFooter className='flex gap-2 justify-between'>
				<Button asChild>
					<Link href={`/reservations/${court.id}`}>Reservas</Link>
				</Button>
				<Button variant='outline' asChild>
					<Link href={`/courts/${court.id}`}>Ajustes</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

export default CourtCard;
