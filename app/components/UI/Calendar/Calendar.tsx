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
import { EventProp, SelectEventSlotProp, TEvent } from './module';

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
	const { title, data, desc } = event;
	const { type, owner } = data;

	return (
		<span>
			<p>{`${owner}: ${title}`}</p>
			{desc && `:  ${desc}`}
			<p>{type}</p>
		</span>
	);
}

function EventMonth({ event }: EventProp) {
	const { data } = event;
	const { owner } = data;

	return <span>{`${owner}`}</span>;
}

function EventAgenda({ event }: EventProp) {
	const { title, data } = event;
	const { owner } = data;

	return <span style={{ color: 'white' }}>{`${owner}: ${title}`}</span>;
}

const customDayPropGetter = (date: Date) => {
	if (isToday(date)) {
		return { className: 'calendar__today' };
	}

	return {};
};

const customEventPropGetter = (event: TEvent) => {
	const { data } = event;
	const { type } = data;
	return { className: `calendar__type-${type}` };
};

type Props = {
	events: TEvent[];
	minHour?: Date | null;
	maxHour?: Date | null;
	defaultDate?: Date;
	views?: View[];
	defaultView?: View;
};

export default function Calendar({
	events,
	minHour = null,
	maxHour = null,
	defaultDate = new Date(),
	views = [Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA],
	defaultView = Views.MONTH,
}: Props) {
	moment.locale('es');
	const localizer = momentLocalizer(moment);

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
	const [myEvents, setEvents] = useState(events);

	const handleSelectSlot = useCallback(
		({ start, end }: SelectEventSlotProp) => {
			// eslint-disable-next-line no-alert
			const title = window.prompt('New Event title');
			const event = {
				start,
				end,
				title,
				data: {
					type: 'match',
					owner: 'Test User',
				},
				desc: '',
			};
			if (title) {
				setEvents(prev => [...prev, event]);
			}
		},
		[setEvents]
	);

	const handleSelectEvent = useCallback(
		// eslint-disable-next-line no-alert
		(event: TEvent) => window.alert(JSON.stringify(event)),
		[]
	);

	return (
		<div className='calendar__container'>
			<ReactCalendar
				localizer={localizer}
				events={myEvents}
				views={views}
				defaultView={defaultView}
				defaultDate={defaultDate}
				{...(minHour ? { min: minHour } : {})}
				{...(maxHour ? { max: maxHour } : {})}
				components={components}
				messages={MESSAGES_LABELS}
				length={AGENDA_RANGE}
				dayPropGetter={customDayPropGetter}
				eventPropGetter={customEventPropGetter}
				selectable
				onSelectEvent={handleSelectEvent}
				onSelectSlot={handleSelectSlot}
			/>
		</div>
	);
}
