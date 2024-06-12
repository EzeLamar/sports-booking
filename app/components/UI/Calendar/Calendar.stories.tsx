import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import { Views } from 'react-big-calendar';
import Calendar from './Calendar';
import { Reservation } from '../../Reservations/ReservationForm';

const meta = {
	title: 'UI/Calendar',
	component: Calendar,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

const events = [
	{
		start: moment('2024-04-07T12:30:00').toDate(),
		end: moment('2024-04-07T14:00:00').toDate(),
		title: 'Evento 1',
		data: {
			id: '1',
			type: 'class',
			owner: 'Ezequiel Lamarque',
		},
	},
	{
		start: moment('2024-04-07T14:00:00').toDate(),
		end: moment('2024-04-07T15:00:00').toDate(),
		title: 'Evento 4',
		data: {
			id: '2',
			type: 'match',
			owner: 'Lucas Bualo',
		},
	},
	{
		start: moment('2024-04-07T18:00:00').toDate(),
		end: moment('2024-04-07T20:00:00').toDate(),
		title: 'Evento 2',
		data: {
			id: '3',
			type: 'class',
			owner: 'Ezequiel Lamarque',
		},
	},
	{
		start: moment('2024-04-07T15:30:00').toDate(),
		end: moment('2024-04-07T16:00:00').toDate(),
		title: 'Evento 3',
		data: {
			id: '4',
			type: 'match',
			owner: 'Lucas Bualo',
		},
	},
	{
		start: moment('2024-04-08T15:30:00').toDate(),
		end: moment('2024-04-08T16:00:00').toDate(),
		title: 'Evento 5',
		data: {
			id: '5',
			type: 'match',
			owner: 'Ezequiel Lamarque',
		},
	},
];

const minHour = moment('2024-04-04T09:00:00').toDate();
const maxHour = moment('2024-04-04T23:00:00').toDate();
const defaultDate = moment('2024-04-07T09:00:00').toDate();
const defaultView = Views.DAY;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleAddEvent = (_data: Reservation): Promise<string> =>
	new Promise(resolve => {
		resolve('1');
	});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleDeleteEvent = (_id: string): Promise<boolean> =>
	new Promise(resolve => {
		resolve(true);
	});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleUpdateEvent = (_data: Reservation): Promise<boolean> =>
	new Promise(resolve => {
		resolve(true);
	});

export const Default: Story = {
	args: {
		events,
		handleAddEvent,
		handleDeleteEvent,
		handleUpdateEvent,
		minHour,
		maxHour,
		defaultDate,
		defaultView,
	},
};
