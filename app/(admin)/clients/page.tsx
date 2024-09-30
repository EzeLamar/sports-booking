'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import Loading from '@/app/components/UI/Loading/Loading';
import { Client } from '@/app/firebase/clients/model';
import { getAllClients } from '@/app/firebase/clients/client';
import ClientsView from '@/app/components/Clients/ClientsView/ClientsView';

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
