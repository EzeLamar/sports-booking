type ReservationData = {
	id: string;
	type: string;
	owner: string;
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
