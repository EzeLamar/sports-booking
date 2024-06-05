import type { Meta, StoryObj } from '@storybook/react';
import ReservationModal from './ReservationModal';
import {
	EMPTY_RESERVATION,
	RESERVATION,
	RESERVATION_WITHOUT_END_TIME,
} from './values';
import { Reservation } from './ReservationForm';

const meta = {
	title: 'Reservations/ReservationModal',
	component: ReservationModal,
	parameters: {},
	tags: [],
	argTypes: {},
} satisfies Meta<typeof ReservationModal>;

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

const handleSubmit = (data: Reservation): Promise<boolean> =>
	new Promise(resolve => {
		// eslint-disable-next-line no-console
		console.log(data);
		// eslint-disable-next-line no-alert
		alert(JSON.stringify(data));
		// eslint-disable-next-line no-alert
		alert(JSON.stringify('se cierra el modal'));
		resolve(true);
	});

const handleDelete = (id: string): Promise<boolean> =>
	new Promise(resolve => {
		// eslint-disable-next-line no-console
		console.log(id);
		// eslint-disable-next-line no-alert
		alert(JSON.stringify(id));
		// eslint-disable-next-line no-alert
		alert(JSON.stringify('se cierra el modal'));
		resolve(true);
	});

const handleClose = (): void => {
	// eslint-disable-next-line no-alert
	alert(JSON.stringify('se cierra el modal'));
};

export const Enabled: Story = {
	args: {
		show: true,
		reservation: RESERVATION,
		editable: true,
		handleSubmit,
		handleClose,
		handleDelete,
		handleCancel: handleClose,
		minDate: reservationStartTime,
		maxDate: reservationStartTime,
	},
};

export const Disabled: Story = {
	args: {
		show: true,
		reservation: RESERVATION,
		handleSubmit,
		handleDelete,
		handleClose,
		minDate: reservationStartTime,
		maxDate: reservationStartTime,
	},
};

export const Empty: Story = {
	args: {
		show: true,
		reservation: EMPTY_RESERVATION,
		editable: true,
		handleSubmit,
		handleClose,
		handleDelete,
		handleCancel: handleClose,
		minDate: reservationStartTime,
		maxDate: reservationStartTime,
	},
};

export const MissingEndTime: Story = {
	args: {
		show: true,
		reservation: RESERVATION_WITHOUT_END_TIME,
		editable: true,
		handleSubmit,
		handleDelete,
		handleCancel: handleClose,
		minDate: reservationStartTime,
		maxDate: reservationStartTime,
	},
};
