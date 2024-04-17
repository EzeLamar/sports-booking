'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from '@/app/components/UI/Calendar/Calendar';
import Loading from '@/app/components//UI/Loading/Loading';
import { Views } from 'react-big-calendar';
import moment from 'moment';
import { useAuthContext } from '../../context/AuthContext';

export default function AdminPage() {
	const user = useAuthContext();
	const router = useRouter();
	const [showAll, setShowAll] = useState(false);
	const minHour = !showAll ? moment('2024-04-04T09:00:00').toDate() : null;
	const maxHour = !showAll ? moment('2024-04-04T23:00:00').toDate() : null;

	const mockEvents = [
		{
			start: moment('2024-04-07T12:30:00').toDate(),
			end: moment('2024-04-07T14:00:00').toDate(),
			title: 'Evento 1',
			data: {
				type: 'class',
				owner: 'Ezequiel Lamarque',
			},
		},
		{
			start: moment('2024-04-07T14:00:00').toDate(),
			end: moment('2024-04-07T15:00:00').toDate(),
			title: 'Evento 4',
			data: {
				type: 'match',
				owner: 'Lucas Bualo',
			},
		},
		{
			start: moment('2024-04-07T18:00:00').toDate(),
			end: moment('2024-04-07T20:00:00').toDate(),
			title: 'Evento 2',
			data: {
				type: 'class',
				owner: 'Ezequiel Lamarque',
			},
		},
		{
			start: moment('2024-04-07T15:30:00').toDate(),
			end: moment('2024-04-07T16:00:00').toDate(),
			title: 'Evento 3',
			data: {
				type: 'match',
				owner: 'Lucas Bualo',
			},
		},
		{
			start: moment('2024-04-08T15:30:00').toDate(),
			end: moment('2024-04-08T16:00:00').toDate(),
			title: 'Evento 5',
			data: {
				type: 'match',
				owner: 'Ezequiel Lamarque',
			},
		},
	];

	const handleShowAll = (): void => {
		setShowAll(!showAll);
	};

	useEffect((): void => {
		if (!user) {
			router.push('/signin');
		}
	}, [user, router]);

	return !user ? (
		<Loading />
	) : (
		<div>
			<label htmlFor='show-all'>
				<input
					type='checkbox'
					id='show-all'
					checked={showAll}
					onChange={handleShowAll}
				/>
				Mostrar Todas las horas?
			</label>

			<Calendar
				events={mockEvents}
				minHour={minHour}
				maxHour={maxHour}
				defaultView={Views.DAY}
			/>
		</div>
	);
}
