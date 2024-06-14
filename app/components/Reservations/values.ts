import moment from 'moment';
import { ReservationType } from '../../firebase/reservations/model';
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
};

export const RESERVATION_WITHOUT_END_TIME: InitialReservation = {
	id: null,
	owner: 'John Doe',
	type: ReservationType.Lesson,
	startTime: RESERVATION_START_TIME,
	endTime: null,
};

export const EMPTY_RESERVATION: InitialReservation = {
	id: null,
	owner: '',
	type: null,
	startTime: null,
	endTime: null,
};
