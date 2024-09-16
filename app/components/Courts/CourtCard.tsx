import Link from 'next/link';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Props = {
	name: string;
	id: string;
};
function CourtCard({ name, id }: Props) {
	return (
		<Card className='m-3 max-w-sm'>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
			</CardHeader>
			<CardContent className='flex gap-2 justify-between'>
				<Button asChild>
					<Link href={`/reservations/${id}`}>Reservas</Link>
				</Button>
				<Button variant='outline' asChild>
					<Link href={`/courts/${id}`}>Ajustes</Link>
				</Button>
			</CardContent>
		</Card>
	);
}

export default CourtCard;
