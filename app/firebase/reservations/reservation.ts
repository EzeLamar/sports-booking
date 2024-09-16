import {
	getFirestore,
	doc,
	getDoc,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	updateDoc,
	query,
	where,
	DocumentReference,
} from 'firebase/firestore';
import moment from 'moment';
import firebaseApp from '@/app/firebase/config';
import { getCourtRef } from '@/app/firebase/courts/courts';
import {
	Reservation,
	ReservationDraft,
} from '@/app/firebase/reservations/model';

function getEndTimeFromStartTimeAndDuration(
	startTime: Date,
	durationInMin: number
): Date {
	return moment(startTime).add(durationInMin, 'minutes').toDate();
}

function getDurationFromStartTimeAndEndTimeInMinutes(
	startTime: Date,
	endTime: Date
): number {
	return (endTime.getTime() - startTime.getTime()) / 60000;
}

export async function getReservation(id: string): Promise<Reservation> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION',
		id
	);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		throw new Error('The reservation does not exist.');
	}
	const data = { ...docSnap.data() };

	return {
		id: docSnap.id,
		court: data.court,
		owner: data.owner,
		type: data.type,
		startTime: data.startTime.toDate(),
		endTime: getEndTimeFromStartTimeAndDuration(
			data.startTime.toDate(),
			data.duration
		),
		price: data.price,
		status: data.status,
	};
}
async function getReservationsByDocRefs(docRefs: DocumentReference[]) {
	const reservationPromises = docRefs.map(docRef => getDoc(docRef));
	const reservationSnapshots = await Promise.all(reservationPromises);

	return reservationSnapshots.map(snapshot => {
		const data = { ...snapshot.data() };
		return {
			id: snapshot.id,
			court: data.court,
			owner: data.owner,
			type: data.type,
			startTime: data.startTime.toDate(),
			endTime: getEndTimeFromStartTimeAndDuration(
				data.startTime.toDate(),
				data.duration
			),
			price: data.price,
			status: data.status,
		};
	});
}
export async function getAllReservations(): Promise<Array<Reservation>> {
	const db = getFirestore(firebaseApp);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION'
	);
	const courtsSnap = await getDocs(colRef);

	return courtsSnap.docs.map((docSnap): Reservation => {
		const data = docSnap.data();

		return {
			id: docSnap.id,
			court: data.court,
			owner: data.owner,
			type: data.type,
			startTime: data.startTime.toDate(),
			endTime: getEndTimeFromStartTimeAndDuration(
				data.startTime.toDate(),
				data.duration
			),
			price: data.price,
			status: data.status,
		};
	});
}

export async function getAllReservationsByCourtId(
	courtId: string
): Promise<Array<Reservation>> {
	const db = getFirestore(firebaseApp);
	const courtRef = getCourtRef(courtId);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION'
	);

	const q = await query(colRef, where('court', '==', courtRef));
	const courtsSnap = await getDocs(q);

	return courtsSnap.docs.map((docSnap): Reservation => {
		const data = docSnap.data();

		return {
			id: docSnap.id,
			court: data.court,
			owner: data.owner,
			startTime: data.startTime.toDate(),
			endTime: getEndTimeFromStartTimeAndDuration(
				data.startTime.toDate(),
				data.duration
			),
			type: data.type,
			price: data.price,
			status: data.status,
		};
	});
}

export async function createReservation(
	reservationData: ReservationDraft
): Promise<string> {
	const db = getFirestore(firebaseApp);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION'
	);

	const reservation = {
		court: reservationData.court,
		owner: reservationData.owner,
		type: reservationData.type,
		startTime: reservationData.startTime,
		duration: getDurationFromStartTimeAndEndTimeInMinutes(
			reservationData.startTime,
			reservationData.endTime
		),
		price: reservationData.price,
		status: reservationData.status,
	};
	const docRef = await addDoc(colRef, reservation);

	return docRef.id;
}

export async function createRegularReservation(
	reservationData: ReservationDraft,
	ocurrences: number
): Promise<Reservation[]> {
	const db = getFirestore(firebaseApp);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION'
	);
	const duration = getDurationFromStartTimeAndEndTimeInMinutes(
		reservationData.startTime,
		reservationData.endTime
	);

	const initialReservation = {
		court: reservationData.court,
		owner: reservationData.owner,
		type: reservationData.type,
		startTime: reservationData.startTime,
		duration,
		price: reservationData.price,
		status: reservationData.status,
	};

	const docRefs: DocumentReference[] = [];
	for (let i = 0; i < ocurrences; i += 1) {
		const newStartTime = new Date(initialReservation.startTime);
		newStartTime.setDate(newStartTime.getDate() + i * 7);
		// eslint-disable-next-line no-await-in-loop
		const docRef = await addDoc(colRef, {
			...initialReservation,
			startTime: newStartTime,
		});
		docRefs.push(docRef);
	}

	return getReservationsByDocRefs(docRefs);
}

export async function deleteReservation(id: string): Promise<boolean> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION',
		id
	);
	await deleteDoc(docRef);

	return true;
}

export async function updateReservation(
	reservationData: Reservation
): Promise<boolean> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION',
		reservationData.id
	);

	await updateDoc(docRef, {
		court: reservationData.court,
		owner: reservationData.owner,
		type: reservationData.type,
		startTime: reservationData.startTime,
		duration: getDurationFromStartTimeAndEndTimeInMinutes(
			reservationData.startTime,
			reservationData.endTime
		),
		price: reservationData.price,
		status: reservationData.status,
	});
	return true;
}
