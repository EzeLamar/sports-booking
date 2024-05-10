import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import ReservationForm, {
	InitialReservation,
	Reservation,
} from './ReservationForm';

const meta = {
	title: 'Reservations/ReservationForm',
	component: ReservationForm,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ReservationForm>;

export default meta;

type Story = StoryObj<typeof meta>;

const now = new Date();
const reservationStartTime = new Date(
	now.getFullYear(),
	now.getMonth(),
	now.getDate(),
	14,
	0
);

const reservation: InitialReservation = {
	owner: 'John Doe',
	startTime: reservationStartTime,
	endTime: moment(reservationStartTime).add(90, 'minutes').toDate(),
};

const reservationWithoutEndTime: InitialReservation = {
	owner: 'John Doe',
	startTime: reservationStartTime,
	endTime: null,
};

const emptyReservation: InitialReservation = {
	owner: '',
	startTime: null,
	endTime: null,
};

const handleSubmit = (data: Reservation): Promise<boolean> =>
	new Promise(resolve => {
		// eslint-disable-next-line no-console
		console.log(data);
		// eslint-disable-next-line no-alert
		alert(JSON.stringify(data));
		resolve(true);
	});

export const Enabled: Story = {
	args: {
		reservation,
		editable: true,
		handleSubmit,
		minDate: reservationStartTime,
		maxDate: reservationStartTime,
	},
};

export const Disabled: Story = {
	args: {
		reservation,
		handleSubmit,
		minDate: reservationStartTime,
		maxDate: reservationStartTime,
	},
};

export const Empty: Story = {
	args: {
		reservation: emptyReservation,
		editable: true,
		handleSubmit,
		minDate: reservationStartTime,
		maxDate: reservationStartTime,
	},
};

export const MissingEndTime: Story = {
	args: {
		reservation: reservationWithoutEndTime,
		editable: true,
		handleSubmit,
		minDate: reservationStartTime,
		maxDate: reservationStartTime,
	},
};
