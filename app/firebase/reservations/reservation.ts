import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ReservationType } from '@/app/components/Reservations/Reservation';
import moment from 'moment';
import firebaseApp from '../config';

const reservationId = 'ioPMkgCdwfB8xfsYd9Ze';

function getEndTimeFromStartTimeAndDuration(
	startTime: Date,
	durationInMin: number
): Date {
	return moment(startTime).add(durationInMin, 'minutes').toDate();
}

export async function getReservation(): Promise<ReservationType> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_RESERVATIONS_COLLECTION ??
			'NEXT_PUBLIC_RESERVATIONS_COLLECTION',
		reservationId
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
