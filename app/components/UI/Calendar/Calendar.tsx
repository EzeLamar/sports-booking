'use client';

import { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import {
	Calendar as ReactCalendar,
	View,
	Views,
	momentLocalizer,
} from 'react-big-calendar';
import { isToday } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import {
	InitialReservation,
	Reservation,
} from '@/app/components/Reservations/ReservationForm';
import ReservationModal from '@/app/components/Reservations/ReservationModal';
import {
	EventProp,
	SelectEventSlotProp,
	TEvent,
} from '@/app/components/UI/Calendar/model';

const AGENDA_RANGE = 7;
const MESSAGES_LABELS = {
	month: 'Mes',
	week: 'Semana',
	day: 'Día',
	today: 'Hoy',
	previous: 'Anterior',
	next: 'Siguiente',
	agenda: 'Agenda',
};

function Event({ event }: EventProp) {
	const { data, desc } = event;
	return (
		<span>
			<strong>{data.owner}</strong>
			{desc && `:  ${desc}`}
		</span>
	);
}

function EventDay({ event }: EventProp) {
	const { data } = event;
	const { owner, price } = data;

	return (
		<span>
			<p>{`$${price} - ${owner}`}</p>
		</span>
	);
}

function EventMonth({ event }: EventProp) {
	const { data } = event;
	const { owner } = data;

	return <span>{`${owner}`}</span>;
}

function EventAgenda({ event }: EventProp) {
	const { data } = event;
	const { owner } = data;

	return <span style={{ color: 'white' }}>{`${owner}`}</span>;
}

const customDayPropGetter = (date: Date) => {
	if (isToday(date)) {
		return { className: 'calendar__today' };
	}

	return {};
};

const customEventPropGetter = (event: TEvent) => {
	const { data } = event;
	const { type, status } = data;
	return { className: `calendar__type-${type} calendar__status-${status}` };
};

type Props = {
	events: TEvent[];
	handleAddEvent: (data: Reservation) => Promise<string>;
	handleAddRegularEvent: (
		data: Reservation,
		ocurrences: number
	) => Promise<TEvent[]>;
	handleDeleteEvent: (id: string) => Promise<boolean>;
	handleUpdateEvent: (data: Reservation) => Promise<boolean>;
	minHour?: Date | null;
	maxHour?: Date | null;
	defaultDate?: Date;
	views?: View[];
	currentView?: View;
	setCurrentView?: (view: View) => void;
	defaultView?: View;
	currentDay?: Date;
	setCurrentDay?: (date: Date) => void;
};

export default function Calendar({
	events,
	handleAddEvent,
	handleAddRegularEvent,
	handleDeleteEvent,
	handleUpdateEvent,
	minHour = null,
	maxHour = null,
	defaultDate = new Date(),
	views = [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA],
	defaultView = Views.MONTH,
	currentView = defaultView,
	currentDay = defaultDate,
	setCurrentView = () => {},
	setCurrentDay = () => {},
}: Props) {
	moment.locale('es');
	const localizer = momentLocalizer(moment);
	const [selected, setSelected] = useState<InitialReservation | null>(null);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [editable, setEditable] = useState<boolean>(false);

	const { components } = useMemo(
		() => ({
			components: {
				day: {
					event: EventDay,
				},
				month: {
					event: EventMonth,
				},
				agenda: {
					event: EventAgenda,
				},
				event: Event,
			},
		}),
		[]
	);
	const [myEvents, setEvents] = useState<TEvent[]>(events);

	const onSubmit = (
		data: Reservation,
		ocurrences: number
	): Promise<boolean> => {
		if (data.id) {
			return new Promise(resolve => {
				handleUpdateEvent(data).then(() => {
					const updatedEvent: TEvent = {
						start: data.startTime,
						end: data.endTime,
						title: 'Test Title',
						data: {
							id: data.id ?? '', // TODO: this will be fixed in a future update
							type: data.type,
							owner: data.owner,
							price: data.price,
							status: data.status,
						},
						desc: '',
					};
					setEvents([
						...myEvents.filter(event => event.data.id !== data.id),
						updatedEvent,
					]);
					setShowModal(false);
					setSelected(null);
					resolve(true);
				});
			});
		}

		if (ocurrences > 1) {
			return new Promise(resolve => {
				handleAddRegularEvent(data, ocurrences).then((newEvents: TEvent[]) => {
					setEvents([...myEvents, ...newEvents]);
					setShowModal(false);
					resolve(true);
				});
			});
		}

		return new Promise(resolve => {
			handleAddEvent(data).then((eventId: string) => {
				const event: TEvent = {
					start: data.startTime,
					end: data.endTime,
					title: 'Test Title',
					data: {
						id: eventId,
						type: data.type,
						owner: data.owner,
						price: data.price,
						status: data.status,
					},
					desc: '',
				};
				setEvents([...myEvents, event]);
				setShowModal(false);
				resolve(true);
			});
		});
	};

	const onDelete = (id: string): Promise<boolean> =>
		new Promise(resolve => {
			handleDeleteEvent(id).then(() => {
				setEvents(myEvents.filter(event => event.data.id !== id));
				setShowModal(false);
				setSelected(null);
				resolve(true);
			});
		});

	const onSelectSlot = useCallback(
		({ start, end }: SelectEventSlotProp) => {
			if (currentView === Views.MONTH) {
				setCurrentView(Views.DAY);
				setCurrentDay(start);
				return;
			}

			const reservation: InitialReservation = {
				id: null,
				type: null,
				owner: '',
				startTime: start,
				endTime: end,
				price: null,
				status: null,
			};
			setSelected(reservation);
			setEditable(true);
			setShowModal(true);
		},
		[currentView, setCurrentDay, setCurrentView]
	);

	const onSelectEvent = useCallback((event: TEvent) => {
		const reservation: InitialReservation = {
			id: event.data.id,
			type: event.data.type,
			owner: event.data.owner,
			startTime: event.start,
			endTime: event.end,
			price: event.data.price,
			status: event.data.status,
		};

		setSelected(reservation);
		setShowModal(true);
		setEditable(false);
	}, []);

	return (
		<div className='h-screen p-4 background'>
			<ReactCalendar
				view={currentView}
				toolbar={false}
				localizer={localizer}
				events={myEvents}
				views={views}
				defaultView={Views.MONTH}
				date={currentDay}
				{...(minHour ? { min: minHour } : {})}
				{...(maxHour ? { max: maxHour } : {})}
				components={components}
				messages={MESSAGES_LABELS}
				length={AGENDA_RANGE}
				dayPropGetter={customDayPropGetter}
				eventPropGetter={customEventPropGetter}
				selectable
				onSelectEvent={onSelectEvent}
				onSelectSlot={onSelectSlot}
				onDrillDown={date => {
					if (currentView === Views.MONTH) {
						setCurrentView(Views.DAY);
						setCurrentDay(date);
					}
				}}
			/>
			{selected && (
				<ReservationModal
					show={showModal}
					reservation={selected}
					handleClose={() => setShowModal(false)}
					handleSubmit={onSubmit}
					handleDelete={onDelete}
					handleCancel={() => setShowModal(false)}
					editable={editable}
					setEditable={setEditable}
					minDate={selected ? selected.startTime : null}
					maxDate={selected ? selected.startTime : null}
				/>
			)}
		</div>
	);
}
