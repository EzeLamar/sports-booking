import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import { Views } from 'react-big-calendar';
import {
	ReservationStatus,
	ReservationType,
} from '../../../firebase/reservations/model';
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
			type: ReservationType.Lesson,
			owner: 'Ezequiel Lamarque',
			price: 5000,
			status: ReservationStatus.Booked,
		},
	},
	{
		start: moment('2024-04-07T14:00:00').toDate(),
		end: moment('2024-04-07T15:00:00').toDate(),
		title: 'Evento 4',
		data: {
			id: '2',
			type: ReservationType.Match,
			owner: 'Lucas Bualo',
			price: 1500,
			status: ReservationStatus.Booked,
		},
	},
	{
		start: moment('2024-04-07T18:00:00').toDate(),
		end: moment('2024-04-07T20:00:00').toDate(),
		title: 'Evento 2',
		data: {
			id: '3',
			type: ReservationType.Tournament,
			owner: 'Ezequiel Lamarque',
			price: 5000,
			status: ReservationStatus.Paid,
		},
	},
	{
		start: moment('2024-04-07T15:30:00').toDate(),
		end: moment('2024-04-07T16:00:00').toDate(),
		title: 'Evento 3',
		data: {
			id: '4',
			type: ReservationType.Match,
			owner: 'Lucas Bualo',
			price: 1500,
			status: ReservationStatus.Booked,
		},
	},
	{
		start: moment('2024-04-08T15:30:00').toDate(),
		end: moment('2024-04-08T16:00:00').toDate(),
		title: 'Evento 5',
		data: {
			id: '5',
			type: ReservationType.Match,
			owner: 'Ezequiel Lamarque',
			price: 1500.5,
			status: ReservationStatus.Canceled,
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
