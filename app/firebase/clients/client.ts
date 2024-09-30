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
import firebaseApp from '@/app/firebase/config';
import { Client } from '@/app/firebase/clients/model';

export async function getClient(id: string): Promise<Client> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_CLIENTS_COLLECTION ??
			'NEXT_PUBLIC_CLIENTS_COLLECTION',
		id
	);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		throw new Error('The Client does not exist.');
	}
	const data = { ...docSnap.data() };

	return {
		id: docSnap.id,
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		phone: data.phone,
	};
}

export async function getAllClients(): Promise<Array<Client>> {
	const db = getFirestore(firebaseApp);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_CLIENTS_COLLECTION ??
			'NEXT_PUBLIC_CLIENTS_COLLECTION'
	);
	const courtsSnap = await getDocs(colRef);

	return courtsSnap.docs.map((docSnap): Client => {
		const data = docSnap.data();

		return {
			id: docSnap.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
		};
	});
}

export async function createClient(clientData: Client): Promise<string> {
	const db = getFirestore(firebaseApp);
	const colRef = collection(
		db,
		process.env.NEXT_PUBLIC_CLIENTS_COLLECTION ??
			'NEXT_PUBLIC_CLIENTS_COLLECTION'
	);

	const client = {
		firstName: clientData.firstName,
		lastName: clientData.lastName,
		email: clientData.email,
		phone: clientData.phone,
	};
	const docRef = await addDoc(colRef, client);

	return docRef.id;
}

export async function deleteClient(id: string): Promise<boolean> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_CLIENTS_COLLECTION ??
			'NEXT_PUBLIC_CLIENTS_COLLECTION',
		id
	);
	await deleteDoc(docRef);

	return true;
}

export async function updateClient(clientData: Client): Promise<boolean> {
	const db = getFirestore(firebaseApp);
	const docRef = doc(
		db,
		process.env.NEXT_PUBLIC_CLIENTS_COLLECTION ??
			'NEXT_PUBLIC_CLIENTS_COLLECTION',
		clientData.id
	);

	await updateDoc(docRef, {
		firstName: clientData.firstName,
		lastName: clientData.lastName,
		email: clientData.email,
		phone: clientData.phone,
	});

	return true;
}
