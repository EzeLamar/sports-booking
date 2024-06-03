import Link from 'next/link';
import React from 'react';

type Props = {
	name: string;
	id: string;
};
function CourtCard({ name, id }: Props) {
	return (
		<div className='card bg-light' style={{ width: '18rem' }}>
			<div className='card-body'>
				<h5 className='card-title'>{name}</h5>
			</div>
			<div className='card-body d-flex flex-row justify-content-between m-2'>
				<Link className='btn btn-primary' href={`/reservations/${id}`}>
					Reservas
				</Link>
				<Link className='btn btn-outline-primary' href={`/courts/${id}`}>
					Ajustes
				</Link>
			</div>
		</div>
	);
}

export default CourtCard;
