import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import ReservationForm, { Reservation } from './ReservationForm';

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

const reservation: Reservation = {
	owner: 'John Doe',
	startTime: reservationStartTime,
	endTime: moment(reservationStartTime).add(90, 'minutes').toDate(),
};

const handleSubmit = (data: unknown): Promise<boolean> =>
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
	},
};

export const Disabled: Story = {
	args: {
		reservation,
		handleSubmit,
	},
};

// export const Empty: Story = {
// 	args: {
// 		editable: true,
// 		handleSubmit,
// 	},
// };
