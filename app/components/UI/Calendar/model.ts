import { ReservationType } from '@/app/firebase/reservations/model';

type ReservationData = {
	id: string;
	type: ReservationType;
	owner: string;
	price: number;
};

export type TEvent = {
	title: string | null;
	start: Date;
	end: Date;
	data: ReservationData;
	desc?: string;
};

export type EventProp = {
	event: TEvent;
};

export type SelectEventSlotProp = {
	start: Date;
	end: Date;
};