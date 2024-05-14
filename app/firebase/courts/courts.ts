import {
	getFirestore,
	doc,
	getDoc,
	updateDoc,
	collection,
	getDocs,
} from 'firebase/firestore';
import { Court } from '../../components/Courts/CourtSettings/CourtSettings';
import firebaseApp from '../config';

export async function getCourt(courtId: string): Promise<Court> {
	const db = getFirestore(firebaseApp);

	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_COURT_COLLECTION ?? 'NEXT_PUBLIC_COURT_COLLECTION',
		courtId
	);

	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		throw new Error('The court does not exist.');
	}

	const data = { ...docSnap.data() };
	return {
		id: data.id,
		isEnabled: data.enabled,
		name: data.name,
		address: data.address,
		availableDays: data.availableDays,
		openHour: data.openHour,
		closeHour: data.closeHour,
		pricePerHour: data.pricePerHour,
	};
}

export async function editCourt(court: Court): Promise<boolean> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_COURT_COLLECTION ?? 'NEXT_PUBLIC_COURT_COLLECTION',
		court.id
	);
	await updateDoc(docRef, court);

	return true;
}

export async function getAllCourts(): Promise<Array<Court>> {
	const db = getFirestore(firebaseApp);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_COURT_COLLECTION ?? 'NEXT_PUBLIC_COURT_COLLECTION'
	);
	const courtsSnap = await getDocs(colRef);

	return courtsSnap.docs.map((docSnap): Court => {
		const data = docSnap.data();
		return {
			id: data.id,
			isEnabled: data.enabled,
			name: data.name,
			address: data.address,
			availableDays: data.availableDays,
			openHour: data.openHour,
			closeHour: data.closeHour,
			pricePerHour: data.pricePerHour,
		};
	});
}
