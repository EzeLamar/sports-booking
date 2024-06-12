import {
	getFirestore,
	doc,
	getDoc,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	updateDoc,
} from 'firebase/firestore';
import {
	ReservationDraft,
	Reservation,
} from '@/app/components/Reservations/Reservation';
import moment from 'moment';
import firebaseApp from '../config';

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
		startTime: data.startTime.toDate(),
		endTime: getEndTimeFromStartTimeAndDuration(
			data.startTime.toDate(),
			data.duration
		),
	};
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
			startTime: data.startTime.toDate(),
			endTime: getEndTimeFromStartTimeAndDuration(
				data.startTime.toDate(),
				data.duration
			),
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
		startTime: reservationData.startTime,
		duration: getDurationFromStartTimeAndEndTimeInMinutes(
			reservationData.startTime,
			reservationData.endTime
		),
	};
	const docRef = await addDoc(colRef, reservation);

	return docRef.id;
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
		startTime: reservationData.startTime,
		duration: getDurationFromStartTimeAndEndTimeInMinutes(
			reservationData.startTime,
			reservationData.endTime
		),
	});
	return true;
}
