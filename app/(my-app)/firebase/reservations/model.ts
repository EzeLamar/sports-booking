import { DocumentReference } from 'firebase/firestore';

/* eslint-disable no-shadow */
export enum ReservationType {
	Lesson = 'lesson',
	Match = 'match',
	Tournament = 'tournament',
}

export enum ReservationStatus {
	Paid = 'paid',
	Booked = 'booked',
	Canceled = 'canceled',
}

export type Reservation = {
	id: string;
	court: DocumentReference;
	owner: string;
	type: ReservationType;
	startTime: Date;
	endTime: Date;
	price: number;
	status: ReservationStatus;
};

export type ReservationDraft = {
	court: DocumentReference;
	owner: string;
	type: ReservationType;
	startTime: Date;
	endTime: Date;
	price: number;
	status: ReservationStatus;
};
