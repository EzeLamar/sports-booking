import {
	getFirestore,
	doc,
	getDoc,
	collection,
	getDocs,
	addDoc,
} from 'firebase/firestore';
import { ReservationType } from '@/app/components/Reservations/Reservation';
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

export async function getReservation(id: string): Promise<ReservationType> {
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
		court: data.court,
		owner: data.owner,
		startTime: data.startTime.toDate(),
		endTime: getEndTimeFromStartTimeAndDuration(
			data.startTime.toDate(),
			data.duration
		),
	};
}

export async function getAllReservations(): Promise<Array<ReservationType>> {
	const db = getFirestore(firebaseApp);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION'
	);
	const courtsSnap = await getDocs(colRef);

	return courtsSnap.docs.map((docSnap): ReservationType => {
		const data = docSnap.data();
		return {
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
	reservationData: ReservationType
): Promise<boolean> {
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
	await addDoc(colRef, reservation);

	return true;
}
