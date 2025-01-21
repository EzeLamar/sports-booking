'use client';

import FilterForm from '@/app/(my-app)/components/UI/Calendar/CalendarModalFilter/FilterForm';
import { Filters } from '@/app/(my-app)/hooks/useReservations';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

type Props = {
	children: React.ReactNode;
	filters: Filters;
	setFilters: (filters: Filters) => void;
};

export default function CalendarModalFilter({
	children,
	filters,
	setFilters,
}: Props) {
	const resetFilters = () => {
		setFilters({
			clientIds: [],
			types: [],
			status: [],
		});
	};

	return (
		<Dialog>
			{children}
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Filtar Reservas</DialogTitle>
				</DialogHeader>
				<div className='flex items-center space-x-2'>
					<div className='grid flex-1 gap-2'>
						<FilterForm filters={filters} setFilters={setFilters} />
						<DialogClose asChild>
							<Button variant='outline' onClick={() => resetFilters()}>
								Limpiar Filtros
							</Button>
						</DialogClose>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
