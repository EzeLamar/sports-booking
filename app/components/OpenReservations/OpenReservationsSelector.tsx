'use client';

import React, { useState } from 'react';
import './OpenReservationsSelector.css';
import OpenReservationBadge from './OpenReservationBadge';

type Props = {
	initialTimes: string[];
	setInitialTime: (initialTIme: string) => void;
};

export default function OpenReservationsSelector({
	initialTimes,
	setInitialTime,
}: Props) {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleInitialTime = (index: number) => {
		setSelectedIndex(index);
		setInitialTime(initialTimes[index]);
	};

	return (
		<div className='open-reservations-selector__container'>
			{initialTimes.map((initialTime, index) => (
				<OpenReservationBadge
					// eslint-disable-next-line react/no-array-index-key
					key={index}
					initialTime={initialTime}
					selected={selectedIndex === index}
					select={() => handleInitialTime(index)}
				/>
			))}
			{!initialTimes.length ? 'No Available Open Reservations' : null}
		</div>
	);
}
