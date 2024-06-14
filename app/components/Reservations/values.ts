import moment from 'moment';
import {
	ReservationStatus,
	ReservationType,
} from '../../firebase/reservations/model';
import { InitialReservation } from './ReservationForm';

const now = new Date();
export const RESERVATION_START_TIME = new Date(
	now.getFullYear(),
	now.getMonth(),
	now.getDate(),
	14,
	0
);

export const RESERVATION: InitialReservation = {
	id: null,
	owner: 'John Doe',
	type: ReservationType.Lesson,
	startTime: RESERVATION_START_TIME,
	endTime: moment(RESERVATION_START_TIME).add(90, 'minutes').toDate(),
	price: 4000.5,
	status: ReservationStatus.Paid,
};

export const RESERVATION_WITHOUT_END_TIME: InitialReservation = {
	id: null,
	owner: 'John Doe',
	type: ReservationType.Lesson,
	startTime: RESERVATION_START_TIME,
	endTime: null,
	price: 4000.5,
	status: ReservationStatus.Booked,
};

export const EMPTY_RESERVATION: InitialReservation = {
	id: null,
	owner: '',
	type: null,
	startTime: null,
	endTime: null,
	price: null,
	status: null,
};
