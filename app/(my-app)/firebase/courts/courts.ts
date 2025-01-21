import {
	getFirestore,
	doc,
	getDoc,
	updateDoc,
	DocumentReference,
	collection,
	getDocs,
	addDoc,
	deleteDoc,
} from 'firebase/firestore';
import { Court } from '@/app/(my-app)/components/Courts/CourtSettings/CourtSettings';
import firebaseApp from '@/app/(my-app)/firebase/config';

export function getCourtRef(courtId: string): DocumentReference {
	const db = getFirestore(firebaseApp);

	return doc(
		db,
		process.env.NEXT_PUBLIC_COURT_COLLECTION ?? 'NEXT_PUBLIC_COURT_COLLECTION',
		courtId
	);
}

export async function getCourt(courtId: string): Promise<Court> {
	const docRef = getCourtRef(courtId);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		throw new Error('The court does not exist.');
	}

	const data = { ...docSnap.data() };
	return {
		id: docSnap.id,
		isEnabled: data.enabled,
		name: data.name,
		address: data.address,
		availableDays: data.availableDays,
		openHour: data.openHour,
		closeHour: data.closeHour,
		matchPerHour: data.matchPerHour,
		classPerHour: data.classPerHour,
		tournamentPerHour: data.tournamentPerHour,
	};
}

export async function createCourt(courtData: Court): Promise<string> {
	const db = getFirestore(firebaseApp);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_COURT_COLLECTION ?? 'NEXT_PUBLIC_COURT_COLLECTION'
	);

	const court = {
		enabled: courtData.isEnabled,
		name: courtData.name,
		address: courtData.address,
		availableDays: courtData.availableDays,
		openHour: courtData.openHour,
		closeHour: courtData.closeHour,
		matchPerHour: courtData.matchPerHour,
		classPerHour: courtData.classPerHour,
		tournamentPerHour: courtData.tournamentPerHour,
	};
	const docRef = await addDoc(colRef, court);

	return docRef.id;
}

export async function editCourt(courtData: Court): Promise<boolean> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_COURT_COLLECTION ?? 'NEXT_PUBLIC_COURT_COLLECTION',
		courtData.id
	);

	const court = {
		enabled: courtData.isEnabled,
		name: courtData.name,
		address: courtData.address,
		availableDays: courtData.availableDays,
		openHour: courtData.openHour,
		closeHour: courtData.closeHour,
		matchPerHour: courtData.matchPerHour,
		classPerHour: courtData.classPerHour,
		tournamentPerHour: courtData.tournamentPerHour,
	};

	await updateDoc(docRef, court);

	return true;
}

export async function deleteCourt(id: string): Promise<boolean> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_COURT_COLLECTION ?? 'NEXT_PUBLIC_COURT_COLLECTION',
		id
	);
	await deleteDoc(docRef);

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
			id: docSnap.id,
			isEnabled: data.enabled,
			name: data.name,
			address: data.address,
			availableDays: data.availableDays,
			openHour: data.openHour,
			closeHour: data.closeHour,
			matchPerHour: data.matchPerHour,
			classPerHour: data.classPerHour,
			tournamentPerHour: data.tournamentPerHour,
		};
	});
}
