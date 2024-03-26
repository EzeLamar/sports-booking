import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { Court } from '@/app/components/Courts/CourtSettings/CourtSettings';
import firebaseApp from '../config';

const id = 'MoyAGC3UjGUEX98qs9ax';

const db = getFirestore(firebaseApp);
const colRef = doc(db, 'court', id);

export function getCourt(): Promise<Court | null> {
	return getDoc(colRef)
		.then(snapshot => {
			const data = { ...snapshot.data() };

			return {
				isEnabled: data.enabled,
				name: data.name,
				address: data.address,
				availableDays: data.availableDays,
				openHour: data.openHour,
				closeHour: data.closeHour,
				pricePerHour: data.pricePerHour,
			};
		})
		.catch(err => {
			// eslint-disable-next-line no-console
			console.log(err.message);

			return null;
		});
}

export function editCourt(court: Court): Promise<boolean> {
	return updateDoc(colRef, court)
		.then(() => true)
		.catch(err => {
			// eslint-disable-next-line no-console
			console.log(err.message);

			return false;
		});
}
