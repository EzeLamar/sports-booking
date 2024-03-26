import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import firebaseApp from '../config';

export async function getCourt(): Promise<Court> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_COURT_COLLECTION,
		process.env.NEXT_PUBLIC_BURATO_COURT_ID
	);

	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		throw new Error('The court does not exist.');
	}

	const data = { ...docSnap.data() };
	return {
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
		process.env.NEXT_PUBLIC_COURT_COLLECTION,
		process.env.NEXT_PUBLIC_BURATO_COURT_ID
	);
	await updateDoc(docRef, court);

	return true;
}
