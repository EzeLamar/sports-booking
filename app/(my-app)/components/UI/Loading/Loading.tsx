import { Spinner } from '@/components/ui/spinner';
import React from 'react';

export default function Loading() {
	return (
		<div className='flex pt-3 justify-center'>
			<Spinner size='large'>Cargando...</Spinner>
		</div>
	);
}
