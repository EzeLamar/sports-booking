import type { Meta, StoryObj } from '@storybook/react';
import ReservationForm, { Reservation } from './ReservationForm';
import {
	EMPTY_RESERVATION,
	RESERVATION,
	RESERVATION_START_TIME,
	RESERVATION_WITHOUT_END_TIME,
} from './values';

const meta = {
	title: 'Reservations/ReservationForm',
	component: ReservationForm,
	parameters: {},
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ReservationForm>;

export default meta;

type Story = StoryObj<typeof meta>;

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
		reservation: RESERVATION,
		editable: true,
		handleSubmit,
		minDate: RESERVATION_START_TIME,
		maxDate: RESERVATION_START_TIME,
	},
};

export const Disabled: Story = {
	args: {
		reservation: RESERVATION,
		handleSubmit,
		minDate: RESERVATION_START_TIME,
		maxDate: RESERVATION_START_TIME,
	},
};

export const Empty: Story = {
	args: {
		reservation: EMPTY_RESERVATION,
		editable: true,
		handleSubmit,
		minDate: RESERVATION_START_TIME,
		maxDate: RESERVATION_START_TIME,
	},
};

export const MissingEndTime: Story = {
	args: {
		reservation: RESERVATION_WITHOUT_END_TIME,
		editable: true,
		handleSubmit,
		minDate: RESERVATION_START_TIME,
		maxDate: RESERVATION_START_TIME,
	},
};
