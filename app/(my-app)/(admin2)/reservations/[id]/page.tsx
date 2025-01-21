'use client';

import moment from 'moment';
import { View, Views } from 'react-big-calendar';
import { useState } from 'react';
import Loading from '@/app/(my-app)/components/UI/Loading/Loading';
import Calendar from '@/app/(my-app)/components/UI/Calendar/Calendar';
import { CourtContext } from '@/app/(my-app)/context/CourtContext';
import CalendarToolbar from '@/app/(my-app)/components/UI/Calendar/CalendarToolbar/CalendarToolbar';
import useClients from '@/app/(my-app)/hooks/useClients';
import useReservations from '@/app/(my-app)/hooks/useReservations';
import { ClientsContext } from '@/app/(my-app)/context/ClientsContext';
import CalendarModalFilter from '@/app/(my-app)/components/UI/Calendar/CalendarModalFilter/CalendarModalFilter';

type Props = {
	params: { id: string };
};

export default function AdminPage({ params }: Props) {
	const [showAll, setShowAll] = useState(false);
	const [currentView, setCurrentView] = useState<View>(Views.MONTH);
	const [currentDay, setCurrentDay] = useState<Date>(new Date());
	const { clients, loading: loadingClients } = useClients();
	const {
		court,
		reservations,
		hasFilter,
		loading: loadingReservations,
		filters,
		setFilters,
		handleAddReservation,
		handleAddRegularReservation,
		handleDeleteReservation,
		handleUpdateReservation,
	} = useReservations({
		courtId: params.id,
		clients,
	});

	const minHour = !showAll
		? moment(`2024-04-04T${court?.openHour}:00`).toDate()
		: null;
	const maxHour = !showAll
		? moment(`2024-04-04T${court?.closeHour}:00`).toDate()
		: null;

	const handleShowAll = (): void => {
		setShowAll(!showAll);
	};

	return (
		<div className='flex flex-col h-[85vh]'>
			{loadingReservations || loadingClients ? (
				<Loading />
			) : (
				<CourtContext.Provider value={court}>
					<ClientsContext.Provider value={clients}>
						<CalendarModalFilter filters={filters} setFilters={setFilters}>
							<CalendarToolbar
								courtName={court?.name ?? '...'}
								currentDay={currentDay}
								setCurrentDay={setCurrentDay}
								currentView={currentView}
								handleCurrentViewChange={setCurrentView}
								showAll={showAll}
								setShowAll={handleShowAll}
								hasFilter={hasFilter}
							/>
							<Calendar
								events={reservations}
								handleAddEvent={handleAddReservation}
								handleAddRegularEvent={handleAddRegularReservation}
								handleDeleteEvent={handleDeleteReservation}
								handleUpdateEvent={handleUpdateReservation}
								minHour={minHour}
								maxHour={maxHour}
								currentView={currentView}
								setCurrentView={setCurrentView}
								currentDay={currentDay}
								setCurrentDay={setCurrentDay}
							/>
						</CalendarModalFilter>
					</ClientsContext.Provider>
				</CourtContext.Provider>
			)}
		</div>
	);
}
