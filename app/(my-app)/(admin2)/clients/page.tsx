'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import hasErrorMessage from '@/app/(my-app)/utils/Error/ErrorHelper';
import Loading from '@/app/(my-app)/components/UI/Loading/Loading';
import { Client } from '@/app/(my-app)/firebase/clients/model';
import { getAllClients } from '@/app/(my-app)/firebase/clients/client';
import ClientsView from '@/app/(my-app)/components/Clients/View/ClientsView';

export default function ClientsPage() {
	const router = useRouter();
	const [clients, setClients] = useState<Array<Client>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect((): void => {
		const fetchData = async () => {
			try {
				const clientsData = await getAllClients();
				setClients(clientsData);
				setLoading(false);
			} catch (error: unknown) {
				if (hasErrorMessage(error)) {
					toast.error(error.message, { theme: 'colored' });
				}
			}
		};
		fetchData();
	}, [router]);

	return loading ? <Loading /> : <ClientsView clients={clients} />;
}
