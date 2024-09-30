import { getAllClients } from '@/app/firebase/clients/client';
import { Client } from '@/app/firebase/clients/model';
import hasErrorMessage from '@/app/utils/Error/ErrorHelper';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type useClientsProps = {
	clients: Client[];
	loading: boolean;
};

export default function useClients(): useClientsProps {
	const [clients, setClients] = useState<Client[]>([]);
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
	}, []);

	return { clients, loading };
}
